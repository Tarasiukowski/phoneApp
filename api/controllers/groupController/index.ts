import { Request, Response } from 'express';
import GroupService from '../../services/groupService';

class GroupController {
  async create({ body }: Request, res: Response) {
    const { email, name, members } = body;

    const { status, ...restData } = await new GroupService(email, name, members).create();

    res.send(restData);
  }
}

export const groupController = new GroupController();
