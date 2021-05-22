import { Router } from 'express';

import { conversationController } from '../controllers/conversationController';

export const conversationRouter = Router();

conversationRouter.post('/', conversationController.index);
