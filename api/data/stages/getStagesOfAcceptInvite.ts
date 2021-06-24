import { updateType } from '../../interfaces';

export const getStagesOfAcceptInvite = (
  email: string,
  from: string,
): { data: object; type: updateType }[] => [
  {
    data: { email, field: 'invites', value: from },
    type: 'pull',
  },
  {
    data: { email, field: 'friends', value: { email: from, notes: [] } },
    type: 'push',
  },
  {
    data: { email: from, field: 'friends', value: { email, notes: [] } },
    type: 'push',
  },
];
