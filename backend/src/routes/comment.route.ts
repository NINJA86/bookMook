import express, { Router } from 'express';
import {
  addComment,
  getCommentByBookId,
  getFeaturedComments,
} from '../controller/comment.controller';
import { idController } from '../middlewares/params.middleware';
import {
  authenticator,
  optionalAuthenticator,
} from '../middlewares/authenticate';
const router: Router = express.Router();

router.get('/featured', optionalAuthenticator, getFeaturedComments);
router
  .route('/:id')
  .get(idController, optionalAuthenticator, getCommentByBookId)
  .post(authenticator, addComment);

export default router;
