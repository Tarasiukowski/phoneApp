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
    try {
      conversationModel.updateOne(
        { _id: id },
        { $pull: { messages: { from: email, id: `${Math.random()}`, content } } },
      );
    } catch (e) {
      return { succes: false };
    }

    return { succes: true };
  }

  static async get(id: string) {
    try {
      const conversation = await conversationModel.findOne({ _id: id });

      return { succes: true, conversation };
    } catch (err) {
      return { succes: true };
    }
  }

  create() {
    try {
      const conversation = new conversationModel(this).save();

      return { succes: true, conversation };
    } catch (err) {
      return { succes: false };
    }
  }
}

export default Conversation;
