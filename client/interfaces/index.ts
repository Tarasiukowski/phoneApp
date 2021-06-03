// Pages

export type propsOnboardingNumberPage = {
  user: User;
};

// Others

export type Conversation = {
  with: string;
  id: string;
};

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
};

export type Error = {
  msg: string;
  id: number;
};
