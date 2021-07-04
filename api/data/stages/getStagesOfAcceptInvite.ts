import { updateType, User } from '../../interfaces';

export const getStagesOfAcceptInvite = (
  email: string,
  from: string,
): { key: keyof User, data: object; type: updateType }[] => [
  {
    key: 'invites',
    data: { email, value: from },
    type: 'pull',
  },
  {
    key: 'friends',
    data: { email, value: { email: from, notes: [] } },
    type: 'push',
  },
  {
    key: 'friends',
    data: { email: from, value: { email, notes: [] } },
    type: 'push',
  },
];
