import express, { Router } from 'express';

import { getAllBooks, getBookBySlug } from '../controller/book.controller';
import { slugController } from '../middlewares/params.middleware';

const router: Router = express.Router();

router.get('/getAll', getAllBooks);

router.get('/:slug', slugController, getBookBySlug);

export default router;
