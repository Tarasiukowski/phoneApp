import { Response, Request } from 'express';

import { userService } from '../../../services';

export const inviteController = {
  invite: {
    async index(req: Request, res: Response) {
      const { email: invitingUserEmail, invitedUserEmail } = req.body;

      const { status, ...restData } = await userService.invite.index(
        invitingUserEmail,
        invitedUserEmail,
      );

      res.status(status).json(restData);
    },
    async get(req: Request, res: Response) {
      const { email: loggedUserEmail } = req.body;

      const { status, data } = await userService.invite.get(loggedUserEmail);

      res.status(status).json(data);
    },
    async accept(req: Request, res: Response) {
      const { email: acceptingUserEmail, invitingUserEmail } = req.body;

      const { status, ...restData } = await userService.invite.accept(
        acceptingUserEmail,
        invitingUserEmail,
      );

      res.status(status).json(restData);
    },
    async reject(req: Request, res: Response) {
      const { email: rejectingUserEmail, invitingUserEmail } = req.body;

      const { status, ...restData } = await userService.invite.reject(
        rejectingUserEmail,
        invitingUserEmail,
      );

      res.status(status).json(restData);
    },
  },
};
