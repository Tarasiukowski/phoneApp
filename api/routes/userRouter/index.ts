import { Router } from 'express';

import { userController } from '../../controllers/userController';
import { friendsRouter } from './friendsRouter';
import { inviteRouter } from './inviteRouter';

export const userRouter = Router();

userRouter
  .post('/verify', userController.verify)
  .put('/update', userController.update)
  .use('/invite', inviteRouter)
  .use('/friends', friendsRouter);
