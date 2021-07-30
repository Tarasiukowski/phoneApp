import { Request, Response } from 'express';

import { authService } from '../services';

export const authController = {
  async byToken(req: Request, res: Response) {
    const { fullUser } = req.body;
    const token = req.cookies['SESSID'];

    const { status, ...restData } = await authService.byToken(token, { fullUser });

    res.status(status).json(restData);
  },
  async login(req: Request, res: Response) {
    const { email, by } = req.body;

    const { status, user, token, errorMsg } = await authService.login(email, by);

    errorMsg || res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.status(status).json({ user, errorMsg });
  },
  async singUp(req: Request, res: Response) {
    const { email, by } = req.body;

    const { status, user, token, errorMsg } = await authService.singup(email, by);

    errorMsg || res.cookie('SESSID', token, { maxAge: 900000, httpOnly: true });
    res.status(status).json({ user, errorMsg });
  },
  logout(_: Request, res: Response) {
    res.clearCookie('SESSID').json({ success: true });
  },
};
