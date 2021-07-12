import { model } from 'mongoose';

import { formatModel } from '../../utils';
import { ERROR } from '../../data/error';
import { conversationSchema } from './conversationSchema';
import { Conversation, Message } from '../../interfaces';
import { ConversationDocument } from './types';

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
        const conversation = await conversationModel.findOne({ _id: id });

        if (conversation) {
          // FIX ME
        }
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
      let formatedConversation: Conversation | undefined;

      if (conversation) {
        formatedConversation = formatModel(conversation) as Conversation;
      }

      return { succes: true, status: 200, conversation: formatedConversation };
    } catch (err) {
      return {
        succes: true,
        status: 404,
        conversation: null,
        errorMsg: ERROR.CONVERSATION_NOT_FOUND,
      };
    }
  }

  async save() {
    const conversation = new conversationModel(this);

    try {
      conversation.save();
      const formatedConversation = formatModel(conversation) as Conversation;

      return { succes: true, status: 200, conversation: formatedConversation };
    } catch (err) {
      return { succes: false, status: 409, conversation: null };
    }
  }
}

export default ConversationModel;
