import { Response, Request } from 'express';

import UserService from '../services/userService/userService';
import { generateCode } from '../utils/generateCode';

class UserController {
  async update(req: Request, res: Response) {
    const body = req.body;

    const data = await UserService.update(body);

    res.send(data);
  }

  async verify(req: Request, res: Response) {
    const { email, code } = req.body;

    const { valid, errorMsg } = await UserService.verifyByCode(email, code);

    if (!valid) {
      res.send({ errorMsg, error: true });
      return;
    }

    res.send({ valid });
  }

  async updateEmail(req: Request, res: Response) {
    const { email, newEmail } = req.body;
    
    const code = generateCode();

    const data = await UserService.update({ email, newEmail: { email: newEmail, code } });

    res.send(data);
  }
}

export const userController = new UserController();
