// Pages

export type propsOnboardingNumberPage = {
  user: User;
};

// Others

export type Message = {
  content: string;
  from: string;
  id: string;
};

export type Conversation = {
  with: string;
  id: string;
};

export type Group = {
  name: string;
  members: string[];
  _id?: string;
};

type Note = {
  content: string;
};

export type DetailedConversation = { user: Member } & Conversation;

export type User = {
  email: string;
  number: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  colorImage: string;
  image: string;
  conversations: Conversation[];
  groups: Group[];
  notes: Note[];
};

export type Error = {
  msg: string;
  id: number;
};

export type Member = {
  email: string;
  number: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  colorImage: string;
  image: string;
  notes: Note[];
};

export type RequireChildren = {
  children: React.ReactNode;
};

export enum AuthType {
  Login = 'login',
  Singup = 'singup',
}

export enum Allow {
  logged = 'logged',
  notLogged = 'notLogged',
}
