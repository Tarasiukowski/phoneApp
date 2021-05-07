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
  color: string
};

export type absolute = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type Error = {
  msg: string;
  id: number;
};

export type formData = {
  email: String;
};
