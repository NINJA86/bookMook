import jwt from 'jsonwebtoken';
import { asyncHandler } from '../lib/funcs';

const authenticator = asyncHandler(async (req, res, next) => {
  console.log('------auth middleware------');
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: 'token was not found' });
  }

  try {
    const decode: any = jwt.verify(
      accessToken,
      process.env.JWT_TOKEN || 'default-sign',
    );

    req.user = decode.id;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'token expired' });
    }
    return res.status(401).json({ message: 'invalid token' });
  }
});

const optionalAuthenticator = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    req.user = null;
    return next();
  }

  try {
    const decoded: any = jwt.verify(
      accessToken,
      process.env.JWT_TOKEN || 'default-sign',
    );

    req.user = decoded.id;
  } catch {
    req.user = null;
  }
  next();
});
export { authenticator, optionalAuthenticator };
