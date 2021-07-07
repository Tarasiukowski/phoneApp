import { Document } from 'mongoose';

export type Message = { from: string; content: string; id: number };

export type Conversation = {
  users: string[];
  messages: Message[];
  id: string
};

export type ConversationDocument = Conversation & Document;
