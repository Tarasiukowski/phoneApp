import { RequireChildren } from 'interfaces';

export type props = RequireChildren;

export type searcherContext = {
  open: boolean;
  handleVisible: (visible: boolean) => void;
};
