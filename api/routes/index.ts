import { Application } from 'express';

import { authRouter } from './authRouter';
import { generateRouter } from './generateRouter';
import { userRouter } from './userRouter';

export const withRouter = (app: Application) => {
  app.use('/auth', authRouter).use('/user', userRouter).use('/generate', generateRouter);
};
