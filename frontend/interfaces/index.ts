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
  absolute?: absolute;
  width?: string;
  margin?: string
};

export type propsSelectNumberButton = {
  onClick: () => void
}

export type propsSelectNumberList = {
  setOpenList: Dispatch<SetStateAction<boolean>>
}

export type propsSelectNumberItem = {
  number: string
}

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

type absolute = {
  top?: string;
  bottom?: string;
  left?:  string;
  right?: string;
};
