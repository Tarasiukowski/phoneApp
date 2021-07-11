import { Member } from 'interfaces';

export type props = {
  content: string;
  onClick: () => void;
  user?: Member;
};
