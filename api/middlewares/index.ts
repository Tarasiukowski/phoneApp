import { Application } from 'express';
import generateMiddleware from './generateMiddleware';

export const useMiddlewares = (app: Application) => {
  app.use('/generate', generateMiddleware.index);
};
