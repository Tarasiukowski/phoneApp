import { Response, Request } from 'express';

import { Class } from '../../../interface';
import UserModel from '../../../models/user/userModel';
import UserService from '../../../services/userService';

export function FriendsControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    async friends(req: Request, res: Response) {
      const { email } = req.body;

      const invites = await (await UserModel.findOne('email', email)).friends;

      const data = await UserService.get(invites, 'email');

      res.send(data);
    }

    async removeFriend(req: Request, res: Response) {
      const { email, friendEmail } = req.body;

      UserService.update({ email, fieldName: 'friends', removeValue: friendEmail }, 'pull');

      res.send({ email, friendEmail });
    }
  };
}
