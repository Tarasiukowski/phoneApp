import { Response, Request } from 'express';
import UserService from '../services/userService';

class UserController {
  update(req: Request, res: Response) {
    const body = req.body;

    const data = UserService.update(body);

    res.send(data);
  }

  verify(req: Request, res: Response) {
    const { email, code } = req.body;

    console.log(email, code);

    const data = UserService.verifyByCode(email, code);

    res.send(data);
  }
}

export const userController = new UserController();
