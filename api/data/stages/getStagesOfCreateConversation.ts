import { updateType, User } from '../../interfaces';

export const getStagesOfCreateConversation = (
  email: string,
  from: string,
  id: string,
): { key: keyof User; data: object; type: updateType }[] => [
  {
    key: 'conversations',
    data: {
      email,
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
