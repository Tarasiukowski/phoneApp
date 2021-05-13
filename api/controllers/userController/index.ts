import { Response, Request } from 'express';

import { inviteController } from './inviteController'
import UserService from '../../services/userService';

class UserController extends inviteController {
  async update(req: Request, res: Response) {
    const { option, ...restBody } = req.body;

    const data = await UserService.update(restBody, option);

    res.send(data);
  }

  async verify(req: Request, res: Response) {
    const { option, ...restBody } = req.body;

    const { valid, errorMsg } = await UserService.verifyByCode(restBody, option);

    if (!valid) {
      res.send({ errorMsg, error: true });
      return;
    }

    res.send({ valid });
  }
}

export const userController = new UserController();
