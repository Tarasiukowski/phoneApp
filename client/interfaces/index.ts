// Pages

export type propsOnboardingNumberPage = {
  user: User;
};

// Others

export type User = {
  email: string;
  number: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  color: string;
  image: string;
};

export type Member = {
  email: string;
  color: string;
  firstname: string;
  lastname: string;
  image?: string;
  number: string;
};

export type Error = {
  msg: string;
  id: number;
};

export type formData = {
  email: String;
};
