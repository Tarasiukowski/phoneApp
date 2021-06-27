import { Router } from 'express';

import { userController } from '../../../controllers/userController';

export const blockRouter = Router();

blockRouter
  .post('/', userController.block.index)
  .post('/get', userController.block.get)
