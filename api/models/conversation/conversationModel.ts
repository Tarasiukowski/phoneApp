import { model } from 'mongoose';

import { conversationSchema } from './conversationSchema';
import { Conversation, ConversationDocument, Message } from './types';

export const conversationModel = model<ConversationDocument>('conversation', conversationSchema);

class ConversationModel {
  users: string[];
  messages: Message[];

  constructor(users: string[]) {
    this.users = users;
    this.messages = [];
  }

  static async remove(by: keyof Conversation, value) {
    try {
      await conversationModel.remove({ [by]: value });
    } catch (err) {
      return { succes: false };
    }

    return { succes: true };
  }

  static async send(content: string, email: string, id: string) {
    try {
      await conversationModel.updateOne(
        { _id: id },
        { $push: { messages: { from: email, content, id: Math.random() } } },
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

export default ConversationModel;
