import { Application } from 'express';
import { authRouter } from './authRouter';
import { generateRouter } from './generateRoute';
import { userRouter } from './userRouter';

export const withRouter = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/user', userRouter)
  app.use('/generate', generateRouter)
};
