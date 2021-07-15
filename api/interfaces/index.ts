export type updateType = 'remove' | 'set' | 'newEmail' | 'push' | 'pull' | 'setEmail';

export type Class = new (...args: any[]) => any;

export type AuthType = 'Google' | undefined;

export type Message = { from: string; content: string; id: number };

export type Conversation = {
  users: string[];
  messages: Message[];
  id: string;
};

type Group = { name: string; members: string[] };

export type Friend = { email: string; notes: { content: string }[] };

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
  conversations: { with: string; id: string }[];
  groups: Group[];
  blocklist: string[];
}

export enum UpdateOption {
  conversation = 'conversation',
  user = 'user',
}

export enum VerifyOption {
  account = 'account',
  email = 'email',
  login = 'login',
}

export enum UpdateType {
  pull = 'pull',
  push = 'push',
}
