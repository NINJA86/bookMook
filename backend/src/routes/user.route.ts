import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../lib/funcs';
import { userModel } from '../model';

const router: Router = express.Router();

router.get(
  '/me',
  asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: 'token was not found' });
    }

    try {
      const decoded: any = jwt.verify(
        accessToken,
        process.env.JWT_TOKEN || 'default-sign',
      );
      if (!decoded) {
        return res.status(401).json({ message: 'token is invalid' });
      }

      const user = await userModel.findById(decoded.id);
      console.log(user);
      req.user = decoded.id;

      return res.json({
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
      });
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'token expired' });
      }

      return res.status(401).json({ message: 'invalid token' });
    }
  }),
);

export default router;
