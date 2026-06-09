import { Model } from 'mongoose';
import bookModel from '../model/book.model';
import { IBook } from '../lib/data';
import { asyncHandler } from '../lib/funcs';
import { NextFunction, Request, Response } from 'express';

const book: Model<IBook> = bookModel;

// -------------------- CONTROLLERS --------------------

export const getBookBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const findBookBySlug = await book
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
  const books = await book.find({}).populate('author').populate('category');

  return res.status(200).json(books);
});
