import { Document } from 'mongoose';

export type By = 'Google' | undefined;

type Conversation = { with: string; id: string };
type Group = { name: string; members: string[] };
type Friend = { email: string; notes: { content: string }[] };
type BlockedUser = { fullname: { firstname: string; lastname: string }; email: string };

export interface User {
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
  friends: Friend[];
  conversations: Conversation[];
  groups: Group[];
  blocklist: BlockedUser[];
}

export type UserDocument = User & Document;
