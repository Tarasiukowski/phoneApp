import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/authService';
import { ERROR } from '../data';

class userMiddleware {
  async index(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const token = req.cookies.SESSID;

    const { user } = await AuthService.index(token);

    if (user && user.value && user.value.email === email) {
      next();
      return;
    }

    res.status(405).send({ errorMsg: ERROR.FUNCTIONALITY_NOT_ALLOWED });
  }
}

const UserMiddleware = new userMiddleware();

export default UserMiddleware;
