import { updateOption } from '../interfaces';

export const getStagesOfRemoveInvite = (
  email: string,
  from: string,
): { data: object; option: updateOption }[] => [
  {
    data: { email, field: 'invites', value: from },
    option: 'pull',
  },
  {
    data: { email, field: 'friends', value: { email: from, notes: [] } },
    option: 'pushToField',
  },
  {
    data: { email: from, field: 'friends', value: { email, notes: [] } },
    option: 'pushToField',
  },
];
