import { updateType, User } from '../../interfaces';

export const getStepsOfCreateConversation = <K extends keyof User>(
  email: string,
  from: string,
  id: string,
): {
  filter: { by: keyof User; valueFilter: User[keyof User] };
  data: { key: any, value: any };
  type: updateType;
}[] => [
  {
    filter: { by: 'email', valueFilter: email },
    data: {
      key: 'conversations',
      value: { with: from, id },
    },
    type: 'push',
  },
  {
    filter: { by: 'email', valueFilter: from },
    data: {
      key: 'conversations',
      value: { with: email, id },
    },
    type: 'push',
  },
];
