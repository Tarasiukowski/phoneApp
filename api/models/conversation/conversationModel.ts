import { Error, model } from 'mongoose';

import { formatModel } from '../../utils';
import { ERROR } from '../../data/error';
import { conversationSchema } from './conversationSchema';
import { Conversation, TypeModel, UpdateType } from '../../interfaces';
import { ConversationDocument } from './types';

export const conversationModel = model<ConversationDocument>('conversation', conversationSchema);

class ConversationModel {
  private constructor(
    private data: {
      conversation: Conversation | null;
    },
  ) {}

  get(loggedUserEmail: string) {
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
          // TODO
        }
      }

      return { succes: true };
    } catch (err) {
      return { succes: false };
    }
  }

  updateMany<K extends keyof Conversation>(
    data: { key: K; value: Conversation[K][number]; type: UpdateType }[],
  ) {
    try {
      data.map(({ key, value, type }) => {
        this.update(key, value, type);
      });

      return { succes: true };
    } catch {
      return { succes: false };
    }
  }

  async remove() {
    const { conversation } = this.data;
    const id = conversation?.id;

    try {
      await conversationModel.remove({ _id: id });

      return { succes: true };
    } catch (err) {
      return { succes: false };
    }
  }

  async send(content: string, author: string) {
    const { conversation } = this.data;
    const id = conversation?.id;

    const message = { from: author, content, id: Math.random() };

    try {
      await conversationModel.updateOne({ _id: id }, { $push: { messages: message } });

      return { succes: true, message };
    } catch (e) {
      return { succes: false, message: null };
    }
  }

  static async findById(id: string) {
    try {
      const conversation = await conversationModel.findOne({ _id: id });
      let formatedConversation: Conversation;

      if (conversation) {
        formatedConversation = formatModel<TypeModel.conversation>(conversation);
      } else {
        throw new Error(ERROR.CONVERSATION_NOT_FOUND);
      }

      return new ConversationModel({
        conversation: formatedConversation,
      });
    } catch (err) {
      return new ConversationModel({
        conversation: null,
      });
    }
  }

  static async create(users: string[]) {
    const conversation = new conversationModel({ users, messages: [] });

    try {
      conversation.save();
      const formatedConversation = formatModel<TypeModel.conversation>(conversation);

      return { conversation: formatedConversation };
    } catch (err) {
      return { conversation: null };
    }
  }
}

export default ConversationModel;
