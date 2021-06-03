import { Request, Response } from 'express';

import AuthService from '../services/authService';

class AuthController {
  async index(req: Request, res: Response) {
    const token = req.cookies['SESSID'];

    const { status, user } = await AuthService.index(token);

    res.send({ user });
  }

  async login(req: Request, res: Response) {
    const { email, by } = req.body;

    const { status, user, token, errorMsg } = await new AuthService(email, by).login();

    if (errorMsg) {
      res.send({ user, errorMsg });
      return;
    }

    res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.send({ user });
  }

  async singUp(req: Request, res: Response) {
    const { email, by, ...restBody } = req.body;

    const { status, user, token, errorMsg } = await new AuthService(email, by).singup(restBody);

    if (errorMsg) {
      res.send({ errorMsg });
      return;
    }

    res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.send({ user });
  }

  logout(_: Request, res: Response) {
    res.clearCookie('SESSID').send({ success: true });
  }
}

export const authController = new AuthController();
