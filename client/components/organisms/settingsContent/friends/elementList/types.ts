import { User } from '../../../../../interfaces';

export type props = {
  user: User;
  onClick: (user: User) => void;
};
