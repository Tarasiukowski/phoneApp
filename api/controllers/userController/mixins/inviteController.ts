import { Response, Request } from 'express';

import UserService from '../../../services/userService';
import UserModel from '../../../models/user/userModel';
import { Class } from '../../../interface';

export function InviteControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    invite = {
      async index(req: Request, res: Response) {
        const { email, to } = req.body;

        const data = await UserService.invite(email, to);

        res.send(data);
      },

      async get(req: Request, res: Response) {
        const { email } = req.body;

        const invites = await (await UserModel.findOne('email', email)).invites;

        const formatedInvites = await UserService.formatData(invites, 'email');

        res.send(formatedInvites);
      },

      async accept(req: Request, res: Response) {
        const { email, from } = req.body;

        const data = await UserService.acceptInvite(email, from);

        res.send(data);
      },

      async reject(req: Request, res: Response) {
        const { email, from } = req.body;

        const data = await UserService.rejectInvite(email, from);

        res.send(data);
      },
    };
  };
}
