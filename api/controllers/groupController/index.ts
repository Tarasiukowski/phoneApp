import { Request, Response } from 'express';

import GroupService from '../../services/groupService';

class GroupController {
  async create({ body }: Request, res: Response) {
    const { email: author, name, members } = body;

    const { status, ...restData } = await new GroupService(author, name).create(members);

    res.status(status).json(restData);
  }

  async remove({ body }: Request, res: Response) {
    const { email: author, name } = body;

    const { status, ...restData } = await new GroupService(author, name).remove();

    res.status(status).json(restData);
  }
}

export const groupController = new GroupController();
