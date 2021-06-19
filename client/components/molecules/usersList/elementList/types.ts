import { User } from '../../../../interfaces';

export type props = {
  user: User;
  name: 'invites' | 'contacts';
  onClick: (user: User) => void;
  onAcceptInvite: (user: User) => void;
};
