import { Response, Request } from 'express';

import UserService from '../services/userService/userService';

class UserController {
  async update(req: Request, res: Response) {
    const body = req.body;

    const data = await UserService.update(body, false, body.removeField);

    res.send(data);
  }

  async verify(req: Request, res: Response) {
    const { email, code, verifyNewEmail } = req.body;

    const { valid, errorMsg } = await UserService.verifyByCode(email, code, verifyNewEmail);

    if (!valid) {
      res.send({ errorMsg, error: true });
      return;
    }

    res.send({ valid });
  }

  async updateEmail(req: Request, res: Response) {
    const { email, newEmail } = req.body;

    const data = await UserService.updateEmail(email, newEmail);

    res.send(data);
  }
}

export const userController = new UserController();
