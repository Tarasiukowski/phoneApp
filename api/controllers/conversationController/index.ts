import { Request, Response } from 'express';

import ConversationService from '../../services/conversationService';

class ConversationController {
  async index({ body }: Request, res: Response) {
    const { id, email } = body;

    const { status, ...restData } = await new ConversationService(id, email).get();

    res.status(status).send(restData);
  }

  async send({ body }: Request, res: Response) {
    const { id, email, content } = body;

    const { status, ...restData } = await new ConversationService(id, email).send(content);

    res.status(status).send(restData);
  }
}

export const conversationController = new ConversationController();
