// Pages

export type propsOnboardingNumberPage = {
  user: User;
};

// Others

export type User = {
  email: string;
  number: string;
  firstname: string;
  lastname: string;
  color: string;
  fullname: string
  image: string
};

export type Invite = {
  email: string,
  color: string,
  firstname: string,
  lastname: string,
  image?: string
}

export type Error = {
  msg: string;
  id: number;
};

export type formData = {
  email: String;
};
