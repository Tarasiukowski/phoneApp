import { Router } from 'express';

import { userController } from '../../controllers/userController';

export const updateRouter = Router();

updateRouter.put('/', userController.update).put('/email', userController.updateEmail);
