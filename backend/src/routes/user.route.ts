import express, { Router } from 'express';

import { getMe } from '../controller/user.controller';

const router: Router = express.Router();

router.get('/me', getMe);

export default router;
