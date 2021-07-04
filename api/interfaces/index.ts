export type updateType = 'remove' | 'set' | 'newEmail' | 'push' | 'pull' | 'setEmail';

export type Class = new (...args: any[]) => any;

export type AuthType = 'Google' | undefined;

type Conversation = { with: string; id: string };

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
  conversations: Conversation[];
  groups: Group[];
  blocklist: string[];
}
