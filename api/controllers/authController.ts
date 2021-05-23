import { Request, Response } from 'express';

import AuthService from '../services/authService';

class AuthController {
  async index(req: Request, res: Response) {
    const token = req.cookies['SESSID'];

    const data = await AuthService.index(token);

    res.send(data);
  }

  async login(req: Request, res: Response) {
    const { email, by } = req.body;

    const { error, errorMsg, user, token } = await new AuthService(email, by).login();

    if (error) {
      res.send({ error, errorMsg });
      return;
    }

    res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.send({ user });
  }

  async singUp(req: Request, res: Response) {
    const { email, by, ...restBody } = req.body;

    const { error, errorMsg, user, token } = await new AuthService(email, by).singup(restBody);

    if (error) {
      res.send({ error, errorMsg });
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
