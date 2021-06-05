import { User } from '../../../../../interfaces';

export type props = {
  member: User | undefined;
  onClick?: () => void;
};
