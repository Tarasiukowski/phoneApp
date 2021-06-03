import { Response, Request } from 'express';

import { Class } from '../../../interfaces';
import UserService from '../../../services/userService';

export function FriendsControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    friends = {
      async index(req: Request, res: Response) {
        const { email } = req.body;

        const { status, data } = await UserService.friend.get(email);

        res.send(data);
      },
      async remove(req: Request, res: Response) {
        const { email, friendEmail } = req.body;

        const data = await UserService.friend.remove(email, friendEmail);

        res.send(data);
      },
    };
  };
}
