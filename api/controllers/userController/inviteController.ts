import { Response, Request } from 'express';

import UserService from '../../services/userService';

class InviteController {
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
}

export const inviteController = InviteController;
