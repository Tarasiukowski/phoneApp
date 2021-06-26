import { Request, Response } from 'express';

import { Class } from '../../../interfaces';
import UserService from '../../../services/userService';

export function BlockControllerMixin<Base extends Class>(base: Base) {
  return class extends base {
    block = {
      async index({ body }: Request, res: Response) {
        const { email, userEmail } = body;

        const { status, ...restData } = await UserService.block.index(email, userEmail);

        res.status(status).send(restData);
      },
    };
  };
}
