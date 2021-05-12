import { Response, Request } from 'express';

import UserService from '../services/userService';
import userModel from '../models/user/userModel';

class UserController {
  async update(req: Request, res: Response) {
    const { options, ...restBody } = req.body;
    const { newEmail } = restBody;

    if (newEmail) {
      const findUser = await userModel.find('email', newEmail);

      if (findUser) {
        return { error: true, errorMsg: 'error - this email is pinned to another account' };
      }
    }

    const data = await UserService.update(restBody, options);

    res.send(data);
  }

  async verify(req: Request, res: Response) {
    const { options, ...restBody } = req.body;

    const { valid, errorMsg } = await UserService.verifyByCode(restBody, options);

    if (!valid) {
      res.send({ errorMsg, error: true });
      return;
    }

    res.send({ valid });
  }

  async invite(req: Request, res: Response) {
    const { email, to } = req.body;

    const data = await UserService.invite(email, to);

    res.send(data);
  }
}

export const userController = new UserController();
