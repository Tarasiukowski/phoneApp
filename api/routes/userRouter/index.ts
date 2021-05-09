import { Router } from 'express';

import { userController } from '../../controllers/userController';
import { updateRouter } from './update';

export const userRouter = Router();

userRouter.post('/verifyByCode', userController.verify).use('/update', updateRouter)
