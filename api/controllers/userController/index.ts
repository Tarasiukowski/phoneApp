import { Response, Request } from 'express';

import { User, VerifyOption } from '../../interfaces';
import UserService from '../../services/userService';
import { getUpdateType } from '../../utils/getUpdateOption';
import { BlockControllerMixin, FriendsControllerMixin, InviteControllerMixin } from './mixins';

class UserController extends FriendsControllerMixin(
  InviteControllerMixin(BlockControllerMixin(class {})),
) {
  async update(req: Request, res: Response) {
    const method = req.method as 'PUT' | 'DELETE';
    const { name } = req.params as { name: keyof User };
    const { type, email, value } = req.body;

    const { status, ...restData } = await UserService.update(
      { by: 'email', valueFilter: email },
      { key: name, value },
      type ? type : getUpdateType(method),
    );

    res.status(status).send(restData);
  }

  async verify(req: Request, res: Response) {
    const { name } = req.params as { name: VerifyOption };
    const body = req.body;

    const { status, ...restData } = await UserService.verify(body, name);

    res.status(status).send(restData);
  }
}

export const userController = new UserController();
