import { StringExpression, Types } from 'mongoose';
import { asyncHandler } from '../lib/funcs';

export const slugController = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug as string;

  if (!slug?.trim()) {
    return res.status(404).json({
      message: 'invalid slug',
      statusCode: 404,
    });
  }
  next();
});

export const idController = asyncHandler(async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Invalid Id format',
      statusCode: 400,
    });
  }

  next();
});
