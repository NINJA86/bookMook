import express, { Router } from 'express';
import { getCurrentUser } from '../controller/user.controller';

const router: Router = express.Router();

router.get('/me', getCurrentUser);

export default router;
