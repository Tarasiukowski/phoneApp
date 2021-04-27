import { Dispatch, SetStateAction, ReactNode } from 'react';

// Pages

export type propsAuthPage = {
  user: User;
};

export type propsOnboardingNumberPage = {
  user: User;
};

// Components

export type propsAuthContent = {
  login?: login;
};

export type propsUserCard = {
  friend?: boolean;
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

export type ButtonNavigation = {
  icon: any;
  content: string;
};

export type propsImageUser = {
  mini?: Boolean;
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

// Templates

export type propsIsLoggedTemplate = {
  children: ReactNode;
  allow: 'logged' | 'notLogged';
};

export type propsRedirectTemplate = {
  isRedirect: boolean;
  redirectTo: string;
};

// Others

export type User = {
  email: String;
  number: string;
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
