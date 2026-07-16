import { Model } from 'mongoose';
import { IBook } from '../lib/data';
import { asyncHandler } from '../lib/funcs';
import { NextFunction, Request, Response } from 'express';
import { findBook, findBooks } from '../repositories/book.repository';
import { Author, Category } from '../model';

// -------------------- CONTROLLERS --------------------

export const getBookBySlug = asyncHandler(async (req, res) => {
  console.log('cookie set?');

  const { slug } = req.params;

  const findBookBySlug = await findBook({ slug }, [
    {
      model: Author,
      as: 'author',
    },
    {
      model: Category,
      as: 'category',
    },
  ]);

  if (!findBookBySlug) {
    return res.status(404).json({
      message: 'Book not found',
      statusCode: 404,
    });
  }

  return res.status(200).json(findBookBySlug);
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await findBooks({}, [
    {
      model: Author,
      as: 'author',
    },
    {
      model: Category,
      as: 'category',
    },
  ]);

  return res.status(200).json(books);
});
