import { Response, Request } from 'express';

import { updateType } from '../../interfaces';
import UserService from '../../services/userService';
import { getUpdateType } from '../../utils/getUpdateOption';
import { FriendsControllerMixin } from './mixins/friendsController';
import { InviteControllerMixin } from './mixins/inviteController';

class UserController extends FriendsControllerMixin(InviteControllerMixin(class {})) {
  async update(req: Request, res: Response) {
    const method = req.method as 'PUT' | 'DELETE';
    const { name } = req.params as { name: updateType };
    const body = method === 'PUT' ? req.body : { ...req.body, field: name };
    const updateType = method === 'PUT' && name ? name : getUpdateType(method);

    const { field } = body;

    const { status, ...restData } = await UserService.update(field, body, updateType);

    res.status(status).send(restData);
  }

  async verify(req: Request, res: Response) {
    const { name } = req.params as { name: 'account' | 'email' };
    const body = req.body;

    const { status, ...restData } = await UserService.verify(body, name);

    res.status(status).send(restData);
  }
}

export const userController = new UserController();
