import { Response, Request } from 'express';

import UserService from '../../../services/userService';
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

      const data = await UserService.getInvites(email);

      res.send(data);
    }
  };
}
