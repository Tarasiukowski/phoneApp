import { Application } from 'express';
import { authRouter } from './authRouter';

export const withRouter = (app: Application) => {
  app.use('/auth', authRouter);
};
