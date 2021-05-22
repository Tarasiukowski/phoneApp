import { Request, Response } from 'express';

import ConversationService from '../../services/conversationService';

class ConversationController {
  async index({ body }: Request, res: Response) {
    const { id, email } = body;

    const data = await new ConversationService(id, email).get();

    res.send(data);
  }
}

export const conversationController = new ConversationController();
