import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../lib/funcs';
import { findUserById } from '../repositories/user.repository';

const JWT_SECRET = process.env.JWT_TOKEN;
if (!JWT_SECRET) {
  throw new Error('JWT_TOKEN env variable is not set');
}

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: 'token was not found' });
    }

    try {
      const decoded: any = jwt.verify(accessToken, JWT_SECRET as string);
      if (!decoded?.id) {
        return res.status(401).json({ message: 'token is invalid' });
      }

      const user = await findUserById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'user does not exist' });
      }

      req.user = decoded.id;

      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone_number,
      });
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'token expired' });
      }
      return res.status(401).json({ message: 'invalid token' });
    }
  },
);
