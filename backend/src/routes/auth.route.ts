import express, { Router } from 'express';
import {
  register,
  login,
  requestResetCode,
  verifyResetCode,
  resetPassword,
  refresh,
} from '../controller/auth.controller';

const router: Router = express.Router();
refresh;

router.post('/register', register);
router.post('/login', login);
router.post('/reset-code', requestResetCode);
router.post('/verify-code', verifyResetCode);
router.post('/reset-password', resetPassword);
router.post('/refresh', refresh);

export default router;
