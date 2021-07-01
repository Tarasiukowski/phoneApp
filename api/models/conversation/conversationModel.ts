import { model } from 'mongoose';

import { ERROR } from '../../data/error';
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

  static async update<K extends keyof Conversation>(
    id: string,
    key: K,
    data: Conversation[K][number],
    type: 'push' | 'pull',
  ) {
    try {
      await conversationModel.updateOne({ _id: id }, { [`$${type}`]: data });

      if (key === 'users' && type === 'push') {
        const conversation = await (await conversationModel.findOne({ _id: id })).toObject();

        // FIX ME
        conversation.messages.map((message) => {});
      }

      return { succes: true, status: 200 };
    } catch (err) {
      return { succes: false, status: 409 };
    }
  }

  static async remove<K extends keyof Conversation>(by: K, value: Conversation[K]) {
    try {
      await conversationModel.remove({ [by]: value });

      return { succes: true, status: 200 };
    } catch (err) {
      return { succes: false, status: 409 };
    }
  }

  static async send(content: string, email: string, id: string) {
    try {
      await conversationModel.updateOne(
        { _id: id },
        { $push: { messages: { from: email, content, id: Math.random() } } },
      );

      return { succes: true, status: 200 };
    } catch (e) {
      return { succes: false, status: 400, errorMsg: ERROR.CONVERSATION_CAN_NOT_SEND_MESSAGE };
    }
  }

  static async get(id: string) {
    try {
      const conversation = await conversationModel.findOne({ _id: id });

      return { succes: true, status: 200, conversation };
    } catch (err) {
      return {
        succes: true,
        status: 404,
        conversation: null,
        errorMsg: ERROR.CONVERSATION_NOT_FOUND,
      };
    }
  }

  save() {
    const conversation = new conversationModel(this);

    try {
      conversation.save();

      return { succes: true, status: 200, conversation };
    } catch (err) {
      return { succes: false, status: 409, conversation: null };
    }
  }
}

export default ConversationModel;
