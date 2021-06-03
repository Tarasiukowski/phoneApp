import { Response, Request } from 'express';

import UserService from '../../services/userService';
import { FriendsControllerMixin } from './mixins/friendsController';
import { InviteControllerMixin } from './mixins/inviteController';

class UserController extends FriendsControllerMixin(InviteControllerMixin(class {})) {
  async update(req: Request, res: Response) {
    const body = req.body;

    const { status, ...restData } = await UserService.update(body);

    res.send(restData);
  }

  async verify(req: Request, res: Response) {
    const { option, ...restBody } = req.body;

    const { status, valid, errorMsg } = await UserService.verify(restBody, option);

    if (valid) {
      res.send({ valid });
      return;
    }

    res.send({ errorMsg, error: true });
  }
}

export const userController = new UserController();
