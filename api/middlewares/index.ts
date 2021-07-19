import { Application } from 'express';

import { mainMiddleware } from './mainMiddleware';

export const useMiddlewares = (app: Application) => {
  app.use('/', mainMiddleware);
};
