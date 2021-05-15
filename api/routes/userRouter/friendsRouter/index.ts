import { Router } from 'express';

import { userController } from '../../../controllers/userController/index';

export const friendsRouter = Router();

friendsRouter.post('/', userController.friends);
