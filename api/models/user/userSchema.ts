import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
  email: String,
  number: String,
  code: String,
  onboarding: Boolean,
  fullname: {
    firstname: String,
    lastname: String,
  },
  onBoarding: Boolean,
  redirectTo: String,
  colorImage: String,
  newEmail: {
    value: String,
    code: String,
  },
  invites: [String],
  friends: [{ email: String, notes: [{ content: String }] }],
  image: String,
  conversations: [{ with: String, id: String }],
  groups: [{ name: String, members: [String] }],
  blocklist: [String],
});
