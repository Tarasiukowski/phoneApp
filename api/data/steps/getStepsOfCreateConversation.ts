import { updateType, User } from '../../interfaces';

export const getStepsOfCreateConversation = <K extends keyof User>(
  acceptingUserEmail: string,
  invitingUserEmail: string,
  id: string,
): {
  email: string;
  data: { key: any; value: any };
  type: updateType;
}[] => [
  {
    email: acceptingUserEmail,
    data: {
      key: 'conversations',
      value: { with: invitingUserEmail, id },
    },
    type: 'push',
  },
  {
    email: invitingUserEmail,
    data: {
      key: 'conversations',
      value: { with: acceptingUserEmail, id },
    },
    type: 'push',
  },
];
