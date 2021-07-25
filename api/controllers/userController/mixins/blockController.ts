import { Request, Response } from 'express';

import { Class } from '../../../interfaces';
import UserService from '../../../services/userService';

export function BlockControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    block = {
      async index({ body }: Request, res: Response) {
        const { email: blockingUser, blockedUser } = body;

        const { status, ...restData } = await UserService.block.index(blockingUser, blockedUser);

        res.status(status).send(restData);
      },
      async get({ body }: Request, res: Response) {
        const { email: loggedUser } = body;

        const { data } = await UserService.block.get(loggedUser);

        res.json(data);
      },
    };

    unblock = {
      async index({ body }: Request, res: Response) {
        const { email: unblockingUser, unblockedUser } = body;

        const { status, ...restData } = await UserService.unblock.index(
          unblockingUser,
          unblockedUser,
        );

        res.status(status).json(restData);
      },
    };
  };
}
