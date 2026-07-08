import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../lib/funcs';
import { userModel } from '../model';
import bcrypt from 'bcrypt';
import nodeMailer from 'nodemailer';
import { registerSchema } from '../lib/verifacation';
const router: Router = express.Router();
const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000;
router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
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
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
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

    const accessToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_TOKEN || 'default-sign',
      { expiresIn: '15m' },
    );

    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_TOKEN || 'default-sign',
      {
        expiresIn: '7d',
      },
    );

    await userModel.updateOne({ _id: newUser._id }, { refreshToken });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ACCESS_TOKEN_EXPIRY,
    });
    return res.status(201).json({
      message: 'user registered successfully',
      userId: newUser._id,
      accessToken,
      refreshToken,
    });
  }),
);

router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    res.cookie('salam', 'salamkhobi');

    const userData = req.body;
    console.log(userData);
    console.log(userData?.email, userData?.phoneNumber);

    let existedUser;

    if (userData?.email) {
      existedUser = await userModel.findOne({
        email: userData.email.toLowerCase().trim(),
      });
    } else {
      existedUser = await userModel.findOne({
        phoneNumber: userData.phoneNumber,
      });
    }

    if (!existedUser) {
      return res.status(404).json({ message: 'user does not exist' });
    }

    const doesPasswordMatch = await bcrypt.compare(
      userData.password,
      existedUser?.password,
    );

    if (!doesPasswordMatch) {
      return res.status(400).json({ message: 'password does not match' });
    }

    const accessToken = jwt.sign(
      { id: existedUser.id, email: existedUser.email },
      process.env.JWT_TOKEN || 'default-sign',
      { expiresIn: '15m' },
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ACCESS_TOKEN_EXPIRY,
    });
    return res.json({
      message: 'user was successfully logged in',
      accessToken,
    });
    // return res.json(req.body);
  }),
);
router.post(
  '/reset-code',
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const existedUser = await userModel.findOne({ email });

    if (!existedUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        resetCode: verificationCode,
        resetCodeExpiresAt: expiresAt,
      },
      { new: true },
    );

    const transport = nodeMailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

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

    const accessToken = jwt.sign(
      {
        id: existedUser.id,
        email: existedUser.email,
      },
      process.env.JWT_TOKEN || 'default-sign',
      {
        expiresIn: '15m',
      },
    );

    return res.status(200).json({
      message: 'Code was successfully sent',
      accessToken,
    });
  }),
);

router.post(
  '/verify-code',
  asyncHandler(async (req, res, next) => {
    const { email, code } = req.body;
    const existedUser = await userModel.findOne({ email });

    if (!existedUser) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }

    if (
      !existedUser.resetCodeExpiresAt ||
      existedUser.resetCodeExpiresAt.getTime() < Date.now()
    ) {
      return res.status(400).json({
        message: 'Code has expired',
      });
    }

    console.log(`main code ${existedUser.resetCode}`);
    console.log(`user code ${code}`);
    if (existedUser.resetCode !== code) {
      return res.status(400).json({
        message: 'Invalid code',
      });
    }

    const resetToken = jwt.sign(
      {
        id: existedUser._id,
        purpose: 'reset-password',
      },
      process.env.JWT_TOKEN || 'default-sign',
      {
        expiresIn: '10m',
      },
    );

    return res.json({
      message: 'Code verified successfully',
      resetToken,
    });
  }),
);

router.post(
  '/reset-password',
  asyncHandler(async (req, res, next) => {
    const { password, email } = req.body;
    const existedUser = await userModel.findOne({ email });

    if (!existedUser) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }

    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    await existedUser.updateOne({
      password: hashedPassword,
      resetCode: null,
      resetCodeExpiresAt: null,
    });
    res.json({ message: 'Password was successfully reset' });
  }),
);
export default router;
