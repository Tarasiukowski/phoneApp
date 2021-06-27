import { updateType } from '../../interfaces';
import { User } from '../../models/user/types';

export const getStagesOfAcceptInvite = (
  email: string,
  from: string,
): { key: keyof User, data: object; type: updateType }[] => [
  {
    key: 'invites',
    data: { email, field: 'invites', value: from },
    type: 'pull',
  },
  {
    key: 'invites',
    data: { email, field: 'friends', value: { email: from, notes: [] } },
    type: 'push',
  },
  {
    key: 'invites',
    data: { email: from, field: 'friends', value: { email, notes: [] } },
    type: 'push',
  },
];
