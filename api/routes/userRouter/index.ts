import { Router } from 'express';

import { userController } from '../../controllers/userController';
import { inviteRouter } from './inviteRouter';

export const userRouter = Router();

userRouter
  .post('/verifyByCode', userController.verify)
  .use('/invite', inviteRouter)
  .put('/update', userController.update);
