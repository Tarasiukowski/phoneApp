import { Request, Response } from 'express';

import UserService from '../services/userService';

class AuthController {
  async index(req: Request, res: Response) {
    const token = req.cookies['SESSID'];

    const data = await UserService.loginByToken(token);

    res.send(data);
  }

  async login(req: Request, res: Response) {
    const { email, by } = req.body;

    const { errorMsg, user, token } = await new UserService(email, by).login();

    if (errorMsg) {
      res.send({ errorMsg });
      return;
    }

    res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.send({ user });
  }

  async singUp(req: Request, res: Response) {
    const { email, by } = req.body;

    const { errorMsg, user, token } = await new UserService(email, by).singup();

    if (errorMsg) {
      res.send({ errorMsg });
      return;
    }

    res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.send({ user });
  }

  logout(_: Request, res: Response) {
    try {
      res.clearCookie('SESSID').send({ error: false });
    } catch {
      res.send({ error: true, msg: 'Can not logout.' });
    }
  }
}

export const authController = new AuthController();
