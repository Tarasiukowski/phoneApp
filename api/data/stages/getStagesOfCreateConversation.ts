import { updateType } from '../../interfaces';

export const getStagesOfCreateConversation = (
  email: string,
  from: string,
  id,
): { data: object; type: updateType }[] => [
  {
    data: {
      email,
      field: 'conversations',
      value: { with: from, id },
    },
    type: 'push',
  },
  {
    data: {
      email: from,
      field: 'conversations',
      value: { with: email, id },
    },
    type: 'push',
  },
];
