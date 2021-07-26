import { Request, Response } from 'express';

import { conversationService } from '../../services';

export const conversationController = {
  async get({ body }: Request, res: Response) {
    const { id: conversationId } = body;

    const { status, ...restData } = await conversationService(conversationId).get();

    res.status(status).json(restData);
  },
  async send({ body }: Request, res: Response) {
    const { id: conversationId, email: author, content } = body;

    const { status, ...restData } = await conversationService(conversationId).send(author, content);

    res.status(status).json(restData);
  },
};
