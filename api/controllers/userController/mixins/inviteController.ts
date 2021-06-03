import { Response, Request } from 'express';

import UserService from '../../../services/userService';
import UserModel from '../../../models/user/userModel';
import { Class } from '../../../interfaces';

export function InviteControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    invite = {
      async index(req: Request, res: Response) {
        const { email, to } = req.body;

        const data = await UserService.invite.index(email, to);

        res.send(data);
      },

      async get(req: Request, res: Response) {
        const { email } = req.body;

        const { status, user } = await UserModel.findOne('email', email);

        const invites = user.invites;

        const { data } = await UserService.formatData(invites, 'email');

        res.send(data);
      },

      async accept(req: Request, res: Response) {
        const { email, from } = req.body;

        const data = await UserService.invite.accept(email, from);

        res.send(data);
      },

      async reject(req: Request, res: Response) {
        const { email, from } = req.body;

        const data = await UserService.invite.reject(email, from);

        res.send(data);
      },
    };
  };
}
