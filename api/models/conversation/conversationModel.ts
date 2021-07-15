import { Error, model } from 'mongoose';

import { formatModel } from '../../utils';
import { ERROR } from '../../data/error';
import { conversationSchema } from './conversationSchema';
import { Conversation, UpdateOption, UpdateType } from '../../interfaces';
import { ConversationDocument } from './types';

export const conversationModel = model<ConversationDocument>('conversation', conversationSchema);

class ConversationModel {
  private constructor(
    private data: {
      succes: boolean;
      status: number;
      conversation: Conversation | null;
      errorMsg?: string;
    },
  ) {}

  get() {
    return this.data;
  }

  async update<K extends keyof Conversation>(
    key: K,
    value: Conversation[K][number],
    type: UpdateType,
  ) {
    const { conversation } = this.data;
    const id = conversation?.id;
    const formatedType = `$${type}`;

    try {
      await conversationModel.updateOne({ _id: id }, { [formatedType]: value });

      if (key === 'users' && type === UpdateType.push) {
        const conversation = await conversationModel.findOne({ _id: id });

        if (conversation) {
          // FIX ME
        }
      }

      return { succes: true, status: 200 };
    } catch (err) {
      return { succes: false, status: 400 };
    }
  }

  updateMany<K extends keyof Conversation>(
    data: { key: K; value: Conversation[K][number]; type: UpdateType }[],
  ) {
    try {
      data.map(({ key, value, type }) => {
        this.update(key, value, type);
      });

      return { succes: true, status: 200 };
    } catch {
      return { succes: false, status: 400 };
    }
  }

  async remove() {
    const { conversation } = this.data;
    const id = conversation?.id;

    try {
      await conversationModel.remove({ _id: id });

      return { succes: true, status: 200 };
    } catch (err) {
      return { succes: false, status: 400 };
    }
  }

  async send(content: string, email: string) {
    const { conversation } = this.data;
    const id = conversation?.id;

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

  static async find(id: string) {
    try {
      const conversation = await conversationModel.findOne({ _id: id });
      let formatedConversation: Conversation;

      if (conversation) {
        formatedConversation = formatModel<UpdateOption.conversation>(conversation);
      } else {
        throw new Error('can not find that conversation');
      }

      return new ConversationModel({
        succes: true,
        status: 200,
        conversation: formatedConversation,
      });
    } catch (err) {
      return new ConversationModel({
        succes: true,
        status: 404,
        conversation: null,
        errorMsg: ERROR.CONVERSATION_NOT_FOUND,
      });
    }
  }

  static async create(users: string[]) {
    const conversation = new conversationModel({ users, messages: [] });

    try {
      conversation.save();
      const formatedConversation = formatModel<UpdateOption.conversation>(conversation);

      return { succes: true, status: 200, conversation: formatedConversation };
    } catch (err) {
      return { succes: false, status: 400, conversation: null };
    }
  }
}

export default ConversationModel;
