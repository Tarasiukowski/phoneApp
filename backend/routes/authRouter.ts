import { Router } from 'express';
import { authController } from '../controllers/authController';

export const authRouter = Router();

authRouter
  .post('/byToken', authController.byToken)
  .post('/login', authController.login)
  .post('/singup', authController.singUp);
