import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService/userService';

class generateMiddleware {
  async index(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.SESSID;

    const { user } = await userService.loginByToken(token);

    if (user) {
      next();
      return;
    }

    res.send({ error: true, msg: 'error - functionality not allowed' });
  }
}

const GenerateMiddleware = new generateMiddleware();

export default GenerateMiddleware;
