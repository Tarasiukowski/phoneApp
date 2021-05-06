import { Application } from 'express';
import generateMiddleware from './generateMiddleware';
import userMiddleware from './userMiddleware';

export const useMiddlewares = (app: Application) => {
  app.use('/generate', generateMiddleware.index).use('/user', userMiddleware.index);
};
