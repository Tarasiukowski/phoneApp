// types

export type updateType = 'remove' | 'set' | 'newEmail' | 'push' | 'pull' | 'setEmail';

export type Class = new (...args: any[]) => any;

export type Message = { from: string; content: string; id: number };

export type Conversation = {
  users: string[];
  messages: Message[];
  id: string;
};

type Group = { name: string; members: string[] };

export type Friend = { email: string; notes: { content: string }[] };

// interfaces

export interface User {
  email: string;
  number: string;
  verify: {
    code: String;
    stage: String;
  };
  fullname: {
    firstname: string;
    lastname: string;
  };
  onBoarding: {
    value: boolean;
    stage: string;
  };
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

// enums

export enum TypeModel {
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

export enum AuthType {
  google = 'google',
  email = 'email',
}
