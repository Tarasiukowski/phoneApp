import { Response, Request } from 'express';

import { Class } from '../../../interfaces';
import UserService from '../../../services/userService';

export function FriendsControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    friends = {
      async index(req: Request, res: Response) {
        const { email } = req.body;

        const { status, ...restData } = await UserService.friend.get(email);

        res.send(restData);
      },
      async remove(req: Request, res: Response) {
        const { email, friendEmail } = req.body;

        const { status, ...restData } = await UserService.friend.remove(email, friendEmail);

        res.send(restData);
      },
    };
  };
}
