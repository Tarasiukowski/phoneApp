import { Response, Request } from 'express';

import UserService from '../services/userService';

class UserController {
  async update(req: Request, res: Response) {
    const { options, ...restBody } = req.body;

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
}

export const userController = new UserController();
