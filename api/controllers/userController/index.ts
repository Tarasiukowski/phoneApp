import { Response, Request } from 'express';

import { User, VerifyOption } from '../../interfaces';
import { userService } from '../../services';
import { getUpdateType } from '../../utils/getUpdateOption';
import { blockController, friendsController, inviteController } from './extensions';

const getUserController = () => {
  const basicHandle = {
    async update(req: Request, res: Response) {
      const method = req.method as 'PUT' | 'DELETE';
      const { name } = req.params as { name: keyof User };
      const { type, email, value } = req.body;

      const { status, ...restData } = await userService.update(
        email,
        { key: name, value },
        type ? type : getUpdateType(method),
      );

      res.status(status).json(restData);
    },
    async verify(req: Request, res: Response) {
      const { option } = req.params as { option: VerifyOption };
      const { email, code } = req.body;

      const { status, ...restData } = await userService.verify(email, code, option);

      res.status(status).json(restData);
    },
  };

  return Object.assign(basicHandle, blockController, friendsController, inviteController);
};

export const userController = getUserController();
