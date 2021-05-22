import { Request, Response } from 'express';

import ConversationService from '../../services/conversationService';

class ConversationController {
  async index({ body }: Request, res: Response) {
    const { id, email } = body;

    const data = await new ConversationService(id, email).get();

    res.send(data);
  }

  send({ body }: Request, res: Response) {
    const { id, email, content } = body

    const data = new ConversationService(id, email).send(content)

    res.send(data)
  }
}

export const conversationController = new ConversationController();
