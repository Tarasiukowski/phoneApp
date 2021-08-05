import { Router } from 'express';

import { authController } from '../controllers/authController';

export const authRouter = Router();

authRouter
  .post('/me', authController.getMe)
  .post('/login', authController.login)
  .post('/singup', authController.singUp)
  .get('/logout', authController.logout);
