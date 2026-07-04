import mongoose from 'mongoose';
import { asyncHandler } from '../lib/funcs';
import { commentModel } from '../model';
import { IBook, IUser } from '../lib/data';

export const getCommentByBookId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const comment = await commentModel.find({ book: id }).populate<IUser>('user');

  console.log('comment');
  if (!comment) {
    return res.status(404).json({
      message: 'comment not found',
      statusCode: 404,
    });
  }
  return res.json(comment);
});

export const addComment = asyncHandler(async (req, res, next) => {
  const { user, book, text, rating, location, avatar } = req.body;

  // ✅ validate کردن ObjectId ها
  if (
    !mongoose.Types.ObjectId.isValid(user) ||
    !mongoose.Types.ObjectId.isValid(book)
  ) {
    return res.status(400).json({
      message: 'Invalid user or book ID',
      statusCode: 400,
    });
  }

  const result = await commentModel.create({
    user,
    book,
    text,
    rating,
    location,
    avatar,
  });

  // ✅ منطق درست - if result یعنی موفق شد
  if (!result) {
    return res.status(400).json({
      message: 'Adding comment has been failed',
      statusCode: 400,
    });
  }

  return res.status(201).json({
    message: 'Comment has been successfully added',
    statusCode: 201,
    data: result,
  });
});

export const getFeaturedComments = asyncHandler(async (req, res, next) => {
  const featuredComments = await commentModel
    .find({ rating: { $gte: 4 } })
    .populate<IBook>('book', 'title slug')
    .populate<IUser>('user', 'name')
    .limit(10);

  return res.json(featuredComments);
});
