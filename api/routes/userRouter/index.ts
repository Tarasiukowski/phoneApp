import { Router } from 'express';

import { userController } from '../../controllers/userController';
import { friendsRouter } from './friendsRouter';
import { inviteRouter } from './inviteRouter';
import { blockRouter } from './blockRouter';

export const userRouter = Router();

userRouter
  .post('/verify/:option', userController.verify)
  .put('/update', userController.update)
  .put('/update/:name', userController.update)
  .delete('/update/:name', userController.update)
  .use('/block', blockRouter)
  .post('/unblock', userController.unblock.index)
  .use('/invite', inviteRouter)
  .use('/friends', friendsRouter);
