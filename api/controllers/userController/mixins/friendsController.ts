import { Response, Request } from 'express';

import { Class } from '../../../interfaces';
import UserService from '../../../services/userService';

export function FriendsControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    friends = {
      async index(req: Request, res: Response) {
        const { email: loggedUser } = req.body;

        const { status, data } = await UserService.friend.get(loggedUser);

        res.status(status).json(data);
      },
      async remove(req: Request, res: Response) {
        const { email: loggedUser, friend } = req.body;

        const { status, ...restData } = await UserService.friend.remove(loggedUser, friend);

        res.status(status).json(restData);
      },
    };
  };
}
