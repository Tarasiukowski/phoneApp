import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/authService';

class mainMiddleware {
  async index(req: Request, _: Response, next: NextFunction) {
    const token = req.cookies.SESSID;

    if (token) {
      const { user } = await AuthService.index(token);

      if (user) {
        if (user.value) {
          const { email } = user.value;

          req.body = { ...req.body, email };
        }
      }
    }

    next();
  }
}

const MainMiddleware = new mainMiddleware();

export default MainMiddleware;
