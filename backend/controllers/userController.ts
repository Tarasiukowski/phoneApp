import { Response, Request } from 'express';
import UserService from '../services/userService';

class UserController {
  update(req: Request, res: Response) {
    const body = req.body;

    UserService.update(body, res);
  }

  verify(req: Request, res: Response) {
    const { email, code } = req.body;

    UserService.verifyByCode(email, code, res);
  }
}

export const userController = new UserController();
