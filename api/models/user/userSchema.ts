import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
  email: String,
  number: String,
  code: String,
  onboarding: Boolean,
  firstname: String,
  lastname: String,
  onBoarding: Boolean,
  redirectTo: String,
  color: String
});
