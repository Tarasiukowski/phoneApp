import { Member } from 'interfaces';

export type props = {
  width?: string;
  id: string;
  getScopedUser: (user: Member) => void;
};
