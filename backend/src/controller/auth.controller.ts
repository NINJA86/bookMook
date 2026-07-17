import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodeMailer from 'nodemailer';
import { Op } from 'sequelize';
import { asyncHandler } from '../lib/funcs';
import { registerSchema } from '../lib/verifacation';
import {
  createUser,
  findAndUpdateUser,
  findUser,
  updateUser,
} from '../repositories/user.repository';

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
function generateTokens(user: { id: unknown; email: string }) {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET as string,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET as string,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
  );

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
  const { phoneNumber: phone_number, email, password, name } = req.body;

  const parsedUserData = registerSchema.safeParse(req.body);
  if (!parsedUserData.success) {
    return res.status(400).json({
      message: 'validation failed',
      fieldErrors: parsedUserData.error.flatten().fieldErrors,
    });
  }

  const existedUser = await findUser({
    [Op.or]: [{ email }, { phone_number }],
  });
  if (existedUser) {
    return res.status(409).json({ message: 'user is already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({
    name,
    email,
    phone_number,
    password: hashedPassword,
    refresh_token: '',
  });

  const { accessToken, refreshToken } = generateTokens(newUser);
  newUser.refresh_token = refreshToken;
  await newUser.save();

  setAuthCookies(res, accessToken, refreshToken);

  return res.status(201).json({
    message: 'user registered successfully',
    userId: newUser.id,
    email,
    accessToken,
    refreshToken,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;

  const existedUser = userData?.email
    ? await findUser({ email: String(userData.email).toLowerCase().trim() })
    : await findUser({ phone_number: userData?.phoneNumber });

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
  await updateUser({ id: existedUser.id }, { refresh_token: refreshToken });

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

    const existedUser = await findUser({ email });
    if (!existedUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const verificationCode = generateResetCode();
    const expiresAt = new Date(Date.now() + RESET_CODE_TTL_MS);

    await findAndUpdateUser(
      { email },
      { reset_code: verificationCode, reset_code_expires_at: expiresAt },
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

    const existedUser = await findUser({ email });
    if (!existedUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (
      !existedUser.reset_code_expires_at ||
      existedUser.reset_code_expires_at.getTime() < Date.now()
    ) {
      return res.status(400).json({ message: 'Code has expired' });
    }

    if (String(existedUser.reset_code) !== String(code)) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    // Burn the code so it can't be replayed for a second reset.
    await updateUser(
      { id: existedUser.id },
      { reset_code: null, reset_code_expires_at: null },
    );

    const resetToken = jwt.sign(
      { id: existedUser.id, purpose: 'reset-password' },
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

    const existedUser = await findUser({ id: decoded.id });
    if (!existedUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser(
      { id: existedUser.id },
      {
        password: hashedPassword,
        reset_code: null,
        reset_code_expires_at: null,
      },
    );

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
    const user = await findUser({
      refresh_token: refreshToken,
      id: decoded.id,
    });
    if (!user) {
      return res.status(401).json({ message: 'invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
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
