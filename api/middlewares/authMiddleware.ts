import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/authService';
import { ERROR } from '../data';

class authMiddleware {
  async index(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.SESSID;

    if (token) {
      const { user, status } = await AuthService.index(token);

      if (user) {
        next();
        return;
      }

      res.send({ user, status })
    }

    res.send({ status: 405, errorMsg: ERROR.FUNCTIONALITY_NOT_ALLOWED })
  }
}

const AuthMiddleware = new authMiddleware();

export default AuthMiddleware;
