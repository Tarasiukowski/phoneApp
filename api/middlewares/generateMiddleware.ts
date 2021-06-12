import { Request, Response, NextFunction } from 'express';

import AuthService from '../services/authService';
import { ERROR } from '../data';

class generateMiddleware {
  async index(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.SESSID;

    const { user } = await AuthService.index(token);

    if (user) {
      next();
      return;
    }

    res.send({ status: 405, errorMsg: ERROR.FUNCTIONALITY_NOT_ALLOWED });
  }
}

const GenerateMiddleware = new generateMiddleware();

export default GenerateMiddleware;
