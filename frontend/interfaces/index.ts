import { Dispatch, SetStateAction } from 'react';

export type propsAuthPage = {
  user: User;
};

export type propsOnboardingNumberPage = {
  user: User;
};

export type propsAuthContent = {
  login?: login;
};

export type propsAuthForm = {
  login?: Boolean;
  setError: Dispatch<SetStateAction<Error | null>>;
};

export type propsButton = {
  disabled?: Boolean;
  transparent?: Boolean;
  absolute?: absolute;
  width?: string;
  margin?: string;
  alert?: boolean;
};

export type propsSelectNumberButton = {
  onClick: () => void;
  number: string | null;
};

export type propsSelectNumberList = {
  setOpenList: Dispatch<SetStateAction<boolean>>;
  setNumber: Dispatch<SetStateAction<string | null>>;
};

export type propsSelectNumberItem = {
  number: string;
  onClick: (e: any) => void;
};

export type propsSelectNumberInput = {
  value: string | undefined;
  onChange: (e: any) => void;
};

export type propsToggleAuth = {
  login?: Boolean;
};

export type propsButtonGoogle = {
  login?: Boolean;
  onClick: (res: any) => void;
};

export type propsAlert = {
  error: Error | null;
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
  left?: string;
  right?: string;
};

export type Error = {
  msg: string;
  id: number;
};
