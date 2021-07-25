import { Response, Request } from 'express';

import UserService from '../../../services/userService';
import { Class } from '../../../interfaces';

export function InviteControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    invite = {
      async index(req: Request, res: Response) {
        const { email: invitingUser, invitedUser } = req.body;

        const { status, ...restData } = await UserService.invite.index(invitingUser, invitedUser);

        res.status(status).json(restData);
      },
      async get(req: Request, res: Response) {
        const { email: loggedUser } = req.body;

        const { status, data } = await UserService.invite.get(loggedUser);

        res.status(status).json(data);
      },
      async accept(req: Request, res: Response) {
        const { email: acceptingUser, invitingUser } = req.body;

        const { status, ...restData } = await UserService.invite.accept(
          acceptingUser,
          invitingUser,
        );

        res.status(status).json(restData);
      },
      async reject(req: Request, res: Response) {
        const { email: rejectingUser, invitingUser } = req.body;

        const { status, ...restData } = await UserService.invite.reject(
          rejectingUser,
          invitingUser,
        );

        res.status(status).json(restData);
      },
    };
  };
}
