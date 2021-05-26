import { Router } from 'express';

import { userController } from '../../../controllers/userController';

export const inviteRouter = Router();

inviteRouter
  .post('/', userController.invite.index)
  .post('/accept', userController.invite.accept)
  .post('/reject', userController.invite.reject)
  .post('/get', userController.invite.get);
