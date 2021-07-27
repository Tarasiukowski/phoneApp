import { Request, Response } from 'express';

import { userService } from '../../../services';

export const blockController = {
  block: {
    async index({ body }: Request, res: Response) {
      const { email: blockingUserEmail, blockedUserEmail } = body;

      const { status, ...restData } = await userService.block.index(
        blockingUserEmail,
        blockedUserEmail,
      );

      res.status(status).json(restData);
    },
    async get({ body }: Request, res: Response) {
      const { email: loggedUserEmail } = body;

      const { data } = await userService.block.get(loggedUserEmail);

      res.json(data);
    },
  },
  unblock: {
    async index({ body }: Request, res: Response) {
      const { email: unblockingUserEmail, unblockedUserEmail } = body;

      const { status, ...restData } = await userService.unblock.index(
        unblockingUserEmail,
        unblockedUserEmail,
      );

      res.status(status).json(restData);
    },
  },
};
