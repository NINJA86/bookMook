import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodeMailer from 'nodemailer';
import { asyncHandler } from '../lib/funcs';
import { userModel } from '../model';
import { registerSchema } from '../lib/verifacation';

// ----------------------------------------------------------------------------
// Config
// ----------------------------------------------------------------------------
const JWT_SECRET = process.env.JWT_TOKEN;
if (!JWT_SECRET) {
  // Fail fast instead of silently signing tokens with a public default value.
  throw new Error('JWT_TOKEN env variable is not set');
}

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
const RESET_TOKEN_EXPIRES_IN = '10m';

const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // was in seconds before -> cookie died after ~10 min
const RESET_CODE_TTL_MS = 10 * 60 * 1000;

const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? ('none' as const) : ('lax' as const),
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/** Creates a fresh access/refresh token pair for a user. */
function generateTokens(user: { _id: unknown; email: string }) {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET as string,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  );

  const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET as string, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
}

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken?: string,
) {
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE_MS,
  });

  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });
  }
}

function generateResetCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

let cachedTransport: nodeMailer.Transporter | null = null;
function getMailTransport() {
  if (!cachedTransport) {
    cachedTransport = nodeMailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return cachedTransport;
}

// ----------------------------------------------------------------------------
// Controllers
// ----------------------------------------------------------------------------

export const register = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;
  const { phoneNumber, email, password, name } = userData;

  const parsedUserData = registerSchema.safeParse(userData);
  if (!parsedUserData.success) {
    return res.status(400).json({
      message: 'validation failed',
      fieldErrors: parsedUserData.error.flatten().fieldErrors,
    });
  }

  const existedUser = await userModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existedUser) {
    return res.status(409).json({ message: 'user is already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    phoneNumber,
    email,
    name,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateTokens(newUser);
  await userModel.updateOne({ _id: newUser._id }, { refreshToken });

  setAuthCookies(res, accessToken, refreshToken);

  return res.status(201).json({
    message: 'user registered successfully',
    userId: newUser._id,
    accessToken,
    refreshToken,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;

  const existedUser = userData?.email
    ? await userModel.findOne({
        email: String(userData.email).toLowerCase().trim(),
      })
    : await userModel.findOne({ phoneNumber: userData?.phoneNumber });

  if (!existedUser) {
    return res.status(404).json({ message: 'user does not exist' });
  }

  const doesPasswordMatch = await bcrypt.compare(
    userData.password,
    existedUser.password,
  );
  if (!doesPasswordMatch) {
    return res.status(400).json({ message: 'password does not match' });
  }

  // Issue a brand new pair on every login instead of reusing whatever
  // refresh token happened to be stored (old one may be expired/rotated).
  const { accessToken, refreshToken } = generateTokens(existedUser);
  await userModel.updateOne({ _id: existedUser._id }, { refreshToken });

  setAuthCookies(res, accessToken, refreshToken);

  return res.json({
    message: 'user was successfully logged in',
    accessToken,
    refreshToken,
  });
});

export const requestResetCode = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const existedUser = await userModel.findOne({ email });
    if (!existedUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const verificationCode = generateResetCode();
    const expiresAt = new Date(Date.now() + RESET_CODE_TTL_MS);

    await userModel.findOneAndUpdate(
      { email },
      { resetCode: verificationCode, resetCodeExpiresAt: expiresAt },
      { new: true },
    );

    const transport = getMailTransport();
    await transport.verify();
    await transport.sendMail({
      from: process.env.SMTP_USERNAME,
      to: existedUser.email,
      subject: 'Password Recovery',
      html: `
      <h2>Password Recovery</h2>
      <p>Your verification code is:</p>
      <h1>${verificationCode}</h1>
    `,
    });

    return res.status(200).json({ message: 'Code was successfully sent' });
  },
);

export const verifyResetCode = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, code } = req.body;

    const existedUser = await userModel.findOne({ email });
    if (!existedUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (
      !existedUser.resetCodeExpiresAt ||
      existedUser.resetCodeExpiresAt.getTime() < Date.now()
    ) {
      return res.status(400).json({ message: 'Code has expired' });
    }

    if (String(existedUser.resetCode) !== String(code)) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    // Burn the code so it can't be replayed for a second reset.
    await userModel.updateOne(
      { _id: existedUser._id },
      { resetCode: null, resetCodeExpiresAt: null },
    );

    const resetToken = jwt.sign(
      { id: existedUser._id, purpose: 'reset-password' },
      JWT_SECRET as string,
      { expiresIn: RESET_TOKEN_EXPIRES_IN },
    );

    return res.json({ message: 'Code verified successfully', resetToken });
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password, resetToken } = req.body;

    if (!resetToken) {
      return res.status(401).json({ message: 'reset token is required' });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(resetToken, JWT_SECRET as string);
    } catch {
      return res
        .status(401)
        .json({ message: 'reset token is invalid or expired' });
    }

    // The previous version trusted a plain email from the body, meaning
    // anyone could reset anyone's password without ever entering the code.
    if (decoded?.purpose !== 'reset-password' || !decoded?.id) {
      return res.status(401).json({ message: 'reset token is invalid' });
    }

    const existedUser = await userModel.findById(decoded.id);
    if (!existedUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await existedUser.updateOne({
      password: hashedPassword,
      resetCode: null,
      resetCodeExpiresAt: null,
    });

    return res.json({ message: 'Password was successfully reset' });
  },
);

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'refresh token not found' });
  }

  try {
    const decoded: any = jwt.verify(refreshToken, JWT_SECRET as string);
    const user = await userModel.findOne({ refreshToken, _id: decoded.id });
    if (!user) {
      return res.status(401).json({ message: 'invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET as string,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    setAuthCookies(res, accessToken);

    return res.json({
      message: 'accessToken has successfully set',
      accessToken,
    });
  } catch {
    return res.status(401).json({ message: 'refresh token expired' });
  }
});
