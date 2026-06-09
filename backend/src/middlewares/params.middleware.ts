import { StringExpression, Types } from 'mongoose';
import { asyncHandler } from '../lib/funcs';
import { bookModel, commentModel } from '../model';

export const slugController = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const slug = req.params.slug;
  const book = await bookModel.find({ slug });

  if (!book) {
    return res.status(404).json({
      message: 'Book not Found',
      statusCode: 404,
    });
  }
  (req as any).book = book;
  next();
});

export const idController = asyncHandler(async (req, res, next) => {
  const id = req.params.id as string;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid Id format',
      statusCode: 400,
    });
  }
  const getComments = await commentModel.find({ book: id });

  if (!getComments) {
    return res.status(404).json({
      message: 'Invalid ID (comment not found)',
      statusCode: 404,
    });
  }
  next();
});
