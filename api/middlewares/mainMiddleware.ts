import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/authService';
import { ERROR } from '../data';

const mainMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.SESSID;

  const { user } = await AuthService.index(token);

  if (user) {
    if (user.value) {
      const { email } = user.value;
      
      req.body = { ...req.body, email };
    }
  } else {
    if (!req.path.startsWith('/auth')) {
      res.status(405).send({ errorMsg: ERROR.FUNCTIONALITY_NOT_ALLOWED });
      return;
    }
  }

  next();
};

export { mainMiddleware };
