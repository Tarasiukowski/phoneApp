// Pages

export type propsOnboardingNumberPage = {
  user: User;
};

// Others

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
  content: string
}

export type DetailedConversation = { user: User } & Conversation;

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
  notes: Note[]
};

export type Error = {
  msg: string;
  id: number;
};
