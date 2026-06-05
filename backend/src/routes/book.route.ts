import express, { Router } from 'express';

import book from '../model/book.model';
import { asyncHandler } from '../lib/funcs';
import {
  getAllBooks,
  getBookBySlug,
  idController,
  slugController,
} from '../controller/book.controller';

const router: Router = express.Router();

router.param('id', idController);

router.param('slug', slugController);
router.get('/getAll', getAllBooks);

router.get('/:slug', getBookBySlug);

export default router;
