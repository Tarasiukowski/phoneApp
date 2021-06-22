import { Request, Response } from 'express';

import AuthService from '../services/authService';

class AuthController {
  async index(req: Request, res: Response) {
    const token = req.cookies['SESSID'];

    const { status, ...restData } = await AuthService.index(token);

    res.send(restData);
  }

  async login(req: Request, res: Response) {
    const { email, by } = req.body;

    const { status, user, token, errorMsg } = await new AuthService(email, by).login();

    errorMsg || res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.status(status).send({ user, errorMsg });
  }

  async singUp(req: Request, res: Response) {
    const { email, by, ...restBody } = req.body;

    const { status, user, token, errorMsg } = await new AuthService(email, by).singup(restBody);

    errorMsg || res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.status(status).send({ user, errorMsg });
  }

  logout(_: Request, res: Response) {
    res.clearCookie('SESSID').send({ success: true });
  }
}

export const authController = new AuthController();
