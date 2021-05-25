import { Schema } from 'mongoose';

export const conversationSchema: Schema = new Schema({
  users: [String],
  messages: [{ from: String, content: String, id: Number }],
});
