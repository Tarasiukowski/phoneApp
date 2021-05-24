export type props = {
  icon: () => JSX.Element;
  content: string;
  size?: {
    width?: string;
    height?: string;
  };
  iconSettings?: {
    marginLeft: string;
  };
  href?: string;
  button?: boolean;
  active?: boolean;
  onClick?: (...args: any) => any;
  id?: string
};

export type propsButton = {
  size?: { width?: string; height?: string };
  iconSettings?: { marginLeft: string };
  active?: boolean;
};
