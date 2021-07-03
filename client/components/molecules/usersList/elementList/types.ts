import { Member } from 'interfaces';

export type props = {
  user: Member;
  name: 'invites' | 'contacts';
  onClick: (user: Member) => void;
  onAcceptInvite: (user: Member) => void;
};
