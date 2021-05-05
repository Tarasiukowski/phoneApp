import { Router } from 'express';

import { userController } from '../controllers/userController';

export const userRouter = Router();

userRouter.put('/update', userController.update).post('/verifyByCode', userController.verify);
