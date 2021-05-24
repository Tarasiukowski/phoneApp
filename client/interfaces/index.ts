// Pages

export type propsOnboardingNumberPage = {
  user: User;
};

// Others

type conversation = {
  with: string,
  id: string
}

export type User = {
  email: string;
  number: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  colorImage: string;
  image: string;
  conversations: conversation[]
};

export type Error = {
  msg: string;
  id: number;
};

export type formData = {
  email: String;
};
