import { Response, Request } from 'express';

import UserService from '../services/userService/userService';

class UserController {
  update(req: Request, res: Response) {
    const body = req.body;

    const data = UserService.update(body);

    res.send(data);
  }

  async verify(req: Request, res: Response) {
    const { email, code } = req.body;

    const { valid, errorMsg } = await UserService.verifyByCode(email, code);

    if (!valid) {
      res.send({ errorMsg, valid });
      return;
    }

    res.send({ valid });
  }
}

export const userController = new UserController();
