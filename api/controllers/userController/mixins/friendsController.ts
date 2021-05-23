import { Response, Request } from 'express';

import { Class } from '../../../interface';
import UserModel from '../../../models/user/userModel';
import UserService from '../../../services/userService';

export function FriendsControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    async friends(req: Request, res: Response) {
      const { email } = req.body;

      const friends = await (await UserModel.findOne('email', email)).friends;

      const formatedFriends = await UserService.formatData(friends, 'email');

      res.send(formatedFriends);
    }

    async removeFriend(req: Request, res: Response) {
      const { email, friendEmail } = req.body;

      UserService.update({ email, field: 'friends', value: friendEmail }, 'pull');

      res.send({ email, friendEmail });
    }
  };
}
