import { Request, Response } from 'express';

import GroupService from '../../services/groupService';

class GroupController {
  async create({ body }: Request, res: Response) {
    const { email, name, members } = body;

    const { status, ...restData } = await new GroupService(email, name).create(members);

    res.status(status).send(restData);
  }

  async remove({ body }: Request, res: Response) {
    const { email, name } = body

    const { status, ...restData } = await new GroupService(email, name).remove();

    res.status(status).send(restData);
  }
}

export const groupController = new GroupController();
