import { Response, Request } from 'express';

import { Class } from '../../../interfaces';
import UserService from '../../../services/userService';

export function FriendsControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    friends = {
      async index(req: Request, res: Response) {
        const { email: loggedUserEmail } = req.body;

        const { status, data } = await UserService.friend.get(loggedUserEmail);

        res.status(status).json(data);
      },
      async remove(req: Request, res: Response) {
        const { email: loggedUserEmail, friend: friendEmail } = req.body;

        const { status, ...restData } = await UserService.friend.remove(
          loggedUserEmail,
          friendEmail,
        );

        res.status(status).json(restData);
      },
    };
  };
}