import { Model } from 'mongoose';
import bookModel from '../model/book.model';
import { IBook } from '../lib/data';
import { asyncHandler } from '../lib/funcs';
import { NextFunction, Request, Response } from 'express';

const book: Model<IBook> = bookModel;

// -------------------- PARAM MIDDLEWARE --------------------

export const idController = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string,
) => {
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      message: 'Invalid ID',
      statusCode: 400,
    });
  }
  next();
};

export const slugController = (
  req: Request,
  res: Response,
  next: NextFunction,
  slug: string,
) => {
  if (!slug) {
    return res.status(400).json({
      message: 'Invalid slug',
      statusCode: 400,
    });
  }
  next();
};

// -------------------- CONTROLLERS --------------------

export const getBookBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const findBookBySlug = await book.findOne({ slug });

  if (!findBookBySlug) {
    return res.status(404).json({
      message: 'Book not found',
      statusCode: 404,
    });
  }

  return res.status(200).json(findBookBySlug);
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await book.find({});

  return res.status(200).json(books);
});
