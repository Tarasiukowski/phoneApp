import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService/userService';

class userMiddleware {
  async index(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const token = req.cookies.SESSID;

    const { user } = await userService.loginByToken(token);

    if (user?.email === email) {
      next();
      return;
    }

    res.send({ error: true, msg: 'error - functionality not allowed' });
  }
}

const UserMiddleware = new userMiddleware();

export default UserMiddleware;
