import { Request, Response } from 'express';

import { groupService } from '../../services/groupService';

export const groupController = {
  async create({ body }: Request, res: Response) {
    const { email: author, name, members } = body;

    const { status, ...restData } = await groupService(author, name).create(members);

    res.status(status).json(restData);
  },
  async remove({ body }: Request, res: Response) {
    const { email: author, name } = body;

    const { status, ...restData } = await groupService(author, name).remove();

    res.status(status).json(restData);
  },
};
