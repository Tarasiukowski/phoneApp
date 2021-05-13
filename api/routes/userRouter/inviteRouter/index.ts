import { Router } from 'express';

import { userController } from '../../../controllers/userController';

export const inviteRouter = Router();

inviteRouter.post('/', userController.invite).post('/get', userController.getInvites);
