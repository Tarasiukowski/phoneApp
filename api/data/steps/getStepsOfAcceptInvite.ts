import { updateType, User } from '../../interfaces';

export const getStepsOfAcceptInvite = (
  email: string,
  from: string,
): { filter: { by: keyof User; valueFilter: User[keyof User] }; data: any; type: updateType }[] => [
  {
    filter: { by: 'email', valueFilter: email },
    data: { key: 'invites', value: from },
    type: 'pull',
  },
  {
    filter: { by: 'email', valueFilter: email },
    data: { key: 'friends', value: { email: from, notes: [] } },
    type: 'push',
  },
  {
    filter: { by: 'email', valueFilter: from },
    data: { key: 'friends', value: { email, notes: [] } },
    type: 'push',
  },
];
