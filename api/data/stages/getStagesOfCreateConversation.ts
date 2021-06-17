import { updateOption } from '../../interfaces';

export const getStagesOfCreateConversation = (
  email: string,
  from: string,
  id,
): { data: object; option: updateOption }[] => [
  {
    data: {
      email,
      field: 'conversations',
      value: { with: from, id },
    },
    option: 'pushToField',
  },
  {
    data: {
      email: from,
      field: 'conversations',
      value: { with: email },
    },
    option: 'pushToField',
  },
];
