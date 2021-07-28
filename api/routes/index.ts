import { Application } from 'express';

import { authRouter } from './authRouter';
import { generateRouter } from './generateRouter';
import { userRouter } from './userRouter';
import { groupRouter } from './groupRouter';

export const useRouter = (app: Application) => {
  app
    .use('/auth', authRouter)
    .use('/user', userRouter)
    .use('/generate', generateRouter)
    .use('/group', groupRouter);
};
