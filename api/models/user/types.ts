import { Document } from 'mongoose';

export type By = 'Google' | undefined;

export type invite = {
  email: string;
};

export interface UserDocument extends Document {
  email: string;
  number: string;
  code: string;
  onboarding: boolean;
  firstname: string;
  lastname: string;
  onBoarding: boolean;
  redirectTo: string;
  color: string;
  image: string;
  newEmail: {
    value: string;
    code: string;
  };
  invites: invite[];
}
