import { Request, Response } from 'express';

import { Class } from '../../../interfaces';
import UserService from '../../../services/userService';

export function BlockControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    block = {
      async index({ body }: Request, res: Response) {
        const { email: blockingUserEmail, blockedUserEmail } = body;

        const { status, ...restData } = await UserService.block.index(
          blockingUserEmail,
          blockedUserEmail,
        );

        res.status(status).send(restData);
      },
      async get({ body }: Request, res: Response) {
        const { email: loggedUserEmail } = body;

        const { data } = await UserService.block.get(loggedUserEmail);

        res.json(data);
      },
    };

    unblock = {
      async index({ body }: Request, res: Response) {
        const { email: unblockingUserEmail, unblockedUserEmail } = body;

        const { status, ...restData } = await UserService.unblock.index(
          unblockingUserEmail,
          unblockedUserEmail,
        );

        res.status(status).json(restData);
      },
    };
  };
}
