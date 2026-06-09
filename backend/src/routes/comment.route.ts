import express, { Router } from 'express';
import {
  addComment,
  getCommentByBookId,
  getFeaturedComments,
} from '../controller/comment.controller';
import { idController } from '../middlewares/params.middleware';
const router: Router = express.Router();

router.get('/featured', getFeaturedComments);
router.route('/:id').get(idController, getCommentByBookId).post(addComment);

export default router;
