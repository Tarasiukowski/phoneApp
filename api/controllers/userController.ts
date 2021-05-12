import { Response, Request } from 'express';

import UserService from '../services/userService';

class UserController {
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

  async invite(req: Request, res: Response) {
    const { email, to } = req.body;

    const data = await UserService.invite(email, to);

    res.send(data);
  }
}

export const userController = new UserController();
