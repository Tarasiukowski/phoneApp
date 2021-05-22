import { model } from 'mongoose';

import { conversationSchema } from './conversationSchema';
import { ConversationDocument, Message } from './types';

export const conversationModel = model<ConversationDocument>('conversation', conversationSchema);

class Conversation {
  users: String[];
  messages: Message[];

  constructor(users: String[]) {
    this.users = users;
    this.messages = [];
  }

  create() {
    new conversationModel(this).save();
  }
}

export default Conversation;
