import { Request, Response } from 'express';

import AuthService from '../services/authService';

class AuthController {
  async index(req: Request, res: Response) {
    const { fullUser } = req.body;
    const token = req.cookies['SESSID'];

    const { status, ...restData } = await AuthService.index(token, { fullUser });

    res.status(status).json(restData);
  }

  async login(req: Request, res: Response) {
    const { email, authType } = req.body;

    const { status, user, token, errorMsg } = await new AuthService(email, authType).login();

    errorMsg || res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.status(status).json({ user, errorMsg });
  }

  async singUp(req: Request, res: Response) {
    const { email, authType, ...restBody } = req.body;

    const { status, user, token, errorMsg } = await new AuthService(email, authType).singup(
      restBody,
    );

    errorMsg || res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.status(status).json({ user, errorMsg });
  }

  logout(_: Request, res: Response) {
    res.clearCookie('SESSID').json({ success: true });
  }
}

export const authController = new AuthController();
