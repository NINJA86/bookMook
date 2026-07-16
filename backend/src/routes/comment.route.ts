import express, { Router } from 'express';
import {
  getCommentByBookId,
  getFeaturedComments,
  sendComment,
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
  .get(idController, optionalAuthenticator, getCommentByBookId);

router.post('/', authenticator, sendComment);
export default router;
