import { updateType } from '../../interfaces';
import { User } from '../../models/user/types';

export const getStagesOfCreateConversation = (
  email: string,
  from: string,
  id,
): { key: keyof User; data: object; type: updateType }[] => [
  {
    key: 'conversations',
    data: {
      email,
      field: 'conversations',
      value: { with: from, id },
    },
    type: 'push',
  },
  {
    key: 'conversations',
    data: {
      email: from,
      value: { with: email, id },
    },
    type: 'push',
  },
];
