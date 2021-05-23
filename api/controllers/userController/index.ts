import { Response, Request } from 'express';

import UserService from '../../services/userService';
import { FriendsControllerMixin } from './mixins/friendsController';
import { InviteControllerMixin } from './mixins/inviteController';

class UserController extends FriendsControllerMixin(InviteControllerMixin(class {})) {
  async update(req: Request, res: Response) {
    const { option, ...restBody } = req.body;

    const data = await UserService.update(restBody, option);

    res.send(data);
  }

  async verify(req: Request, res: Response) {
    const { option, ...restBody } = req.body;

    const { valid, errorMsg } = await UserService.verifyByCode(restBody, option);

    if (valid) {
      res.send({ valid });
      return;
    }

    res.send({ errorMsg, error: true });
  }
}

export const userController = new UserController();
