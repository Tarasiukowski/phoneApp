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
  colorImage: string;
  image: string;
};

export type Error = {
  msg: string;
  id: number;
};

export type formData = {
  email: String;
};
