import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../lib/funcs';
import bcrypt from 'bcrypt';
import nodeMailer from 'nodemailer';
import { registerSchema } from '../lib/verifacation';
import {
  createUser,
  findAndUpdateUser,
  findUser,
  updateUser,
} from '../repositories/user.repository';
import { Op } from 'sequelize';
const router: Router = express.Router();
const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000;
const RESET_TOKEN_EXPIRY = 10 * 60 * 1000;
router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
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

    const accessToken = jwt.sign(
      { id: newUser.id, email },
      process.env.JWT_TOKEN || 'default-sign',
      { expiresIn: '15m' },
    );

    const refreshToken = jwt.sign(
      { id: newUser.id, email },
      process.env.JWT_TOKEN || 'default-sign',
      { expiresIn: '7d' },
    );

    newUser.refresh_token = refreshToken;
    await newUser.save();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    return res.status(201).json({
      message: 'user registered successfully',
      email,
      accessToken,
    });
  }),
);

router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const userData = req.body;

    console.log(userData?.email, userData?.phoneNumber);

    let existedUser;

    if (userData?.email) {
      existedUser = await findUser({
        email: userData.email.toLowerCase().trim(),
      });
    } else {
      existedUser = await findUser({
        phone_number: userData.phoneNumber,
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
    const refreshToken = existedUser.refresh_token;

    const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000;
    const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60;
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRY,
    });
    return res.json({
      message: 'user was successfully logged in',
      accessToken,
      refreshToken,
    });
    // return res.json(req.body);
  }),
);

router.post(
  '/reset-code',
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const existedUser = await findUser({ email });
    console.log(existedUser);
    if (!existedUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await findAndUpdateUser(
      { email },
      {
        reset_code: verificationCode,
        reset_code_expires_at: expiresAt,
      },
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

    const resetToken = jwt.sign(
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
      resetToken,
    });
  }),
);

router.post(
  '/verify-code',
  asyncHandler(async (req, res, next) => {
    const { email, code } = req.body;
    const existedUser = await findUser({ email });

    if (!existedUser) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }

    if (
      !existedUser.reset_code_expires_at ||
      existedUser.reset_code_expires_at.getTime() < Date.now()
    ) {
      return res.status(400).json({
        message: 'Code has expired',
      });
    }

    console.log(`main code ${existedUser.reset_code}`);
    console.log(`user code ${code}`);
    if (existedUser.reset_code !== code) {
      return res.status(400).json({
        message: 'Invalid code',
      });
    }

    const resetToken = jwt.sign(
      {
        id: existedUser.id,
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
    const existedUser = await findUser({ email });
    console.log(existedUser);
    if (!existedUser) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }

    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUser(
      { id: existedUser.id },
      {
        password: hashedPassword,
        reset_code: null,
        reset_code_expires_at: null,
      },
    );
    res.json({ message: 'Password was successfully reset' });
  }),
);
router.post(
  '/refresh',
  asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'refresh token not found' });
    }

    try {
      const decode: any = jwt.verify(
        refreshToken,
        process.env.JWT_TOKEN || 'default-sign',
      );
      const user = await findUser({
        refresh_token: refreshToken,
        id: decode.id,
      });

      if (!user) {
        return res.status(401).json({ message: 'invalid refresh token' });
      }
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_TOKEN || 'default-sign',
        { expiresIn: '15m' },
      );
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      });
      return res.json({ message: 'accessToken has successfully set' });
    } catch (error) {
      return res.status(401).json({ message: 'refresh token expired' });
    }
  }),
);

export default router;
