import { Router } from 'express';

import { userController } from '../../../controllers/userController';

export const inviteRouter = Router();

inviteRouter
  .post('/', userController.invite)
  .post('/accept', userController.acceptInvite)
  .post('/get', userController.getInvites)
