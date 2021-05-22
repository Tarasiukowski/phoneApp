import { Document } from 'mongoose';

export type By = 'Google' | undefined;

export interface UserDocument extends Document {
  email: string;
  number: string;
  code: string;
  onboarding: boolean;
  fullname: {
    firstname: string;
    lastname: string;
  };
  onBoarding: boolean;
  redirectTo: string;
  colorImage: string;
  image: string;
  newEmail: {
    value: string;
    code: string;
  };
  invites: string[];
  friends: string[];
  conversations: string[];
}
