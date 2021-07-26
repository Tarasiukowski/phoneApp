import { Response, Request } from 'express';

import { userService } from '../../../services';

export const friendsController = {
  friends: {
    async index(req: Request, res: Response) {
      const { email: loggedUserEmail } = req.body;

      const { status, data } = await userService.friend.get(loggedUserEmail);

      res.status(status).json(data);
    },
    async remove(req: Request, res: Response) {
      const { email: loggedUserEmail, friend: friendEmail } = req.body;

      const { status, ...restData } = await userService.friend.remove(loggedUserEmail, friendEmail);

      res.status(status).json(restData);
    },
  },
};
