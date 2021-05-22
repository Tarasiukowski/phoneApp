import { Document } from 'mongoose';

export type Message = { from: string; content: string; id: number };

export interface ConversationDocument extends Document {
  users: string[];
  messages: Message[];
}
