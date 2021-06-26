type ButtonNavigationData = {
  href: string;
  icon: () => JSX.Element;
  content: string;
};

export type ButtonsNavigationData = {
  account: ButtonNavigationData[];
  workspace: ButtonNavigationData[];
};
