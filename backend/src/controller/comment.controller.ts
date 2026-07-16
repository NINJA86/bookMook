import { Op } from 'sequelize';
import { asyncHandler } from '../lib/funcs';
import { Book, Comment, User } from '../model';
import { addComment, findComments } from '../repositories/comment.repository';
import { findBookById } from '../repositories/book.repository';
import { findUserById } from '../repositories/user.repository';

export const getCommentByBookId = asyncHandler(async (req, res) => {
  const bookId = Number(req.params.id);

  const book = await Book.findByPk(bookId);

  if (!book) {
    return res.status(404).json({
      message: 'Book not found',
      statusCode: 404,
    });
  }

  const comments = await findComments(
    {
      book_id: bookId,
    },
    [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      },
    ],
  );

  return res.status(200).json({
    statusCode: 200,
    data: comments,
  });
});

export const sendComment = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
      statusCode: 401,
    });
  }

  const userId = req.user;
  const { book_id, text, rating, location } = req.body;

  const bookId = Number(book_id);
  const parsedRating = Number(rating);

  if (Number.isNaN(bookId) || Number.isNaN(parsedRating)) {
    return res.status(400).json({
      message: 'Invalid data',
      statusCode: 400,
    });
  }

  if (!text?.trim()) {
    return res.status(400).json({
      message: 'Comment text is required',
      statusCode: 400,
    });
  }

  if (parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({
      message: 'Rating must be between 1 and 5',
      statusCode: 400,
    });
  }

  const [book, user] = await Promise.all([
    findBookById(bookId),
    findUserById(userId),
  ]);

  if (!book) {
    return res.status(404).json({
      message: 'Book not found',
      statusCode: 404,
    });
  }

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
      statusCode: 404,
    });
  }

  const comment = await addComment({
    user_id: userId,
    book_id: bookId,
    text: text.trim(),
    rating: parsedRating,
    location: location || null,
    avatar: '/avatars/avatar-4.png',
  });

  const result = await findBookById(comment.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      },
    ],
  });

  return res.status(201).json({
    message: 'Comment created successfully',
    statusCode: 201,
    data: result,
  });
});

export const getFeaturedComments = asyncHandler(async (req, res) => {
  const comments = await findComments(
    {
      rating: {
        [Op.gte]: 4,
      },
    },
    [
      {
        model: Book,
        as: 'book',
        attributes: ['id', 'title', 'slug'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      },
    ],
  );

  return res.status(200).json({
    statusCode: 200,
    data: comments,
  });
});
