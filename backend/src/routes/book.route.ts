import express, { Router } from 'express';

import { getAllBooks, getBookBySlug } from '../controller/book.controller';
import { slugController } from '../middlewares/params.middleware';
import { optionalAuthenticator } from '../middlewares/authenticate';

const router: Router = express.Router();

router.get('/getAll', optionalAuthenticator, getAllBooks);

router.get('/:slug', optionalAuthenticator, slugController, getBookBySlug);

export default router;
