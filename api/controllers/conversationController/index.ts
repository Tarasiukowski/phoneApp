import { Request, Response } from 'express';

import ConversationService from '../../services/conversationService';

class ConversationController {
  async index({ body }: Request, res: Response) {
    const { id } = body;

    const { status, ...restData } = await new ConversationService(id).get();

    res.status(status).send(restData);
  }

  async send({ body }: Request, res: Response) {
    const { id, email, content } = body;

    const { status, ...restData } = await new ConversationService(id).send(email, content);

    res.status(status).send(restData);
  }
}

export const conversationController = new ConversationController();
