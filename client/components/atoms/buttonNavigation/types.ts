import { FunctionComponent } from "react";

export type props = {
  icon: FunctionComponent;
  content: string;
  size?: {
    width?: string;
    height?: string;
  };
  iconSettings?: {
    marginLeft: string;
  };
  href?: string;
  onClick?: (...args: any) => void;
  id?: string
};

export type propsButton = {
  size?: { width?: string; height?: string };
  iconSettings?: { marginLeft: string };
  active?: boolean;
};
