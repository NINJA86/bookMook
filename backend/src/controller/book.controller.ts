import { Model } from 'mongoose';
import { IBook } from '../lib/data';
import { asyncHandler } from '../lib/funcs';
import { bookModel } from '../model';

// -------------------- CONTROLLERS --------------------

export const getBookBySlug = asyncHandler(async (req, res) => {
  console.log('cookie set?');

  const { slug } = req.params;

  const findBookBySlug = await bookModel
    .findOne({ slug })
    .populate('author')
    .populate('category');

  if (!findBookBySlug) {
    return res.status(404).json({
      message: 'Book not found',
      statusCode: 404,
    });
  }

  return res.status(200).json(findBookBySlug);
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await bookModel
    .find({})
    .populate('author')
    .populate('category');
  return res.status(200).json(books);
});
