import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/authService';

class userMiddleware {
  async index(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const token = req.cookies.SESSID;

    const { user } = await AuthService.index(token);

    if (user?.email === email) {
      next();
      return;
    }

    res.send({ error: true, errorMsg: 'error - functionality not allowed' });
  }
}

const UserMiddleware = new userMiddleware();

export default UserMiddleware;
