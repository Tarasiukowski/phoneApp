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
    const { name } = req.params as { name: 'account' | 'email' };
    const body = req.body;

    const { status, ...restData } = await UserService.verify(body, name);

    res.send(restData);
  }
}

export const userController = new UserController();
