import { Request, Response } from 'express';

import ConversationService from '../../services/conversationService';

class ConversationController {
  async index({ body }: Request, res: Response) {
    const { id: conversationId } = body;

    const { status, ...restData } = await new ConversationService(conversationId).get();

    res.status(status).json(restData);
  }

  async send({ body }: Request, res: Response) {
    const { id: conversationId, email: author, content } = body;

    const { status, ...restData } = await new ConversationService(conversationId).send(
      author,
      content,
    );

    res.status(status).json(restData);
  }
}

export const conversationController = new ConversationController();
