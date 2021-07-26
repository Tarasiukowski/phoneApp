import { Response, Request } from 'express';

import UserService from '../../../services/userService';
import { Class } from '../../../interfaces';

export function InviteControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    invite = {
      async index(req: Request, res: Response) {
        const { email: invitingUserEmail, invitedUserEmail } = req.body;

        const { status, ...restData } = await UserService.invite.index(
          invitingUserEmail,
          invitedUserEmail,
        );

        res.status(status).json(restData);
      },
      async get(req: Request, res: Response) {
        const { email: loggedUserEmail } = req.body;

        const { status, data } = await UserService.invite.get(loggedUserEmail);

        res.status(status).json(data);
      },
      async accept(req: Request, res: Response) {
        const { email: acceptingUserEmail, invitingUserEmail } = req.body;

        const { status, ...restData } = await UserService.invite.accept(
          acceptingUserEmail,
          invitingUserEmail,
        );

        res.status(status).json(restData);
      },
      async reject(req: Request, res: Response) {
        const { email: rejectingUserEmail, invitingUserEmail } = req.body;

        const { status, ...restData } = await UserService.invite.reject(
          rejectingUserEmail,
          invitingUserEmail,
        );

        res.status(status).json(restData);
      },
    };
  };
}
