import { model } from 'mongoose';

import { conversationSchema } from './conversationSchema';
import { ConversationDocument, Message } from './types';

export const conversationModel = model<ConversationDocument>('conversation', conversationSchema);

class Conversation {
  users: string[];
  messages: Message[];

  constructor(users: string[]) {
    this.users = users;
    this.messages = [];
  }

  static send(content: string, email: string, id: string) {
    conversationModel.updateOne(
      { _id: id },
      { $pull: { messages: { from: email, id: `${Math.random()}`, content } } },
    );

    return { succes: true };
  }

  static async get(id: string) {
    const conversation = await conversationModel.findOne({ _id: id });

    return conversation;
  }

  create() {
    const conversation = new conversationModel(this).save();

    return conversation;
  }
}

export default Conversation;
