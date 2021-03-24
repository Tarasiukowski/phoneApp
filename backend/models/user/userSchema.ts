import { Schema } from 'mongoose';

export const userSchema = new Schema({
  email: String,
  number: String,
  code: String,
  onboarding: Boolean,
  firstName: String,
  lastName: String,
});
