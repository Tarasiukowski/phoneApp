import { Request, Response } from 'express';
import UserService from '../services/userService';
import { verifyEmail } from '../utils';

class AuthController {
  byToken(req: Request, res: Response) {
    const { token } = req.body;

    UserService.verify(token, res);
  }

  async login(req: Request, res: Response) {
    const { email } = req.body;

    const { verify, errorMsg } = verifyEmail(email);

    verify ? await new UserService(email).login(res) : res.send({ errorMsg });
  }

  async singUp(req: Request, res: Response) {
    const { email } = req.body;

    const { verify, errorMsg } = verifyEmail(email);

    verify ? await new UserService(email).singup(res) : res.send({ errorMsg });
  }
}

export const authController = new AuthController();
