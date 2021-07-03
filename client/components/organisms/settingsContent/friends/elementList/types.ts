import { Member } from 'interfaces';

export type props = {
  user: Member;
  onClick: (user: Member) => Promise<void>;
};
