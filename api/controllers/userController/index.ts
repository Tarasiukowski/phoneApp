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

    const data = await UserService.verify(restBody, option);

    res.send(data);
  }
}

export const userController = new UserController();
