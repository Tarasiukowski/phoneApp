import { Dispatch, SetStateAction } from 'react';

export type propsAuthPage = {
  user: User;
};

export type propsAuthContent = {
  login?: login;
};

export type propsAuthForm = {
  login?: Boolean;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};

export type propsButton = {
  disabled?: Boolean;
  transparent?: Boolean;
};

export type propsToggleAuth = {
  login?: Boolean;
};

export type propsButtonGoogle = {
  login?: Boolean;
  onClick: (res: any) => void;
};

export type propsAlert = {
  errorMessage: String;
  close: () => void;
};

export type formData = {
  email: String;
};

export type User = {
  email: String;
};

type login = Boolean;