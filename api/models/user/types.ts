import { Document } from 'mongoose';

export type By = 'Google' | undefined;

export interface UserDocument extends Document {
  email: string;
  number: string;
  code: string;
  onboarding: boolean;
  firstname: string;
  lastname: string;
  onBoarding: boolean;
  redirectTo: string;
}
