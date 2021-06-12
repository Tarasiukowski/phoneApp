import { Application } from 'express';

import generateMiddleware from './generateMiddleware';
import mainMiddleware from './mainMiddleware';
import userMiddleware from './userMiddleware';
import conversationMiddleware from './userMiddleware';

export const useMiddlewares = (app: Application) => {
  app
    .use('/', mainMiddleware.index)
    .use('/generate', generateMiddleware.index)
    .use('/user', userMiddleware.index)
    .use('/conversation', conversationMiddleware.index);
};
