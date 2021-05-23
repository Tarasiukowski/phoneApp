import { Response, Request } from 'express';

import UserService from '../../../services/userService';
import UserModel from '../../../models/user/userModel';
import { Class } from '../../../interface';

export function InviteControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    async invite(req: Request, res: Response) {
      const { email, to } = req.body;

      const data = await UserService.invite(email, to);

      res.send(data);
    }

    async getInvites(req: Request, res: Response) {
      const { email } = req.body;

      const invites = await (await UserModel.findOne('email', email)).invites;

      const data = await UserService.get(invites, 'email');

      res.send(data);
    }

    async acceptInvite(req: Request, res: Response) {
      const { email, from } = req.body;

      console.log(email, from)

      const data = await UserService.acceptInvite(email, from);

      res.send(data);
    }

    async rejectInvite(req: Request, res: Response) {
      const { email, from } = req.body;

      const data = await UserService.rejectInvite(email, from);

      res.send(data);
    }
  };
}
