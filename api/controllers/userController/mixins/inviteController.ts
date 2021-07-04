import { Response, Request } from 'express';

import UserService from '../../../services/userService';
import { Class } from '../../../interfaces';

export function InviteControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    invite = {
      async index(req: Request, res: Response) {
        const { email, to } = req.body;

        const { status, ...restData } = await UserService.invite.index(email, to);

        res.status(status).send(restData);
      },
      async get(req: Request, res: Response) {
        const { email } = req.body;

        const { status, data } = await UserService.invite.get(email);

        res.status(status).send(data);
      },
      async accept(req: Request, res: Response) {
        const { email, from } = req.body;

        const { status, ...restData } = await UserService.invite.accept(email, from);

        res.status(status).send(restData);
      },
      async reject(req: Request, res: Response) {
        const { email, from } = req.body;

        const { status, ...restData } = await UserService.invite.reject(email, from);

        res.status(status).send(restData);
      },
    };
  };
}
