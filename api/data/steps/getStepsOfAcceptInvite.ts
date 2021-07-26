import { updateType, User } from '../../interfaces';

export const getStepsOfAcceptInvite = (
  acceptingUserEmail: string,
  invitingUserEmail: string,
): { email: string; data: any; type: updateType }[] => [
  {
    email: acceptingUserEmail,
    data: { key: 'invites', value: invitingUserEmail },
    type: 'pull',
  },
  {
    email: acceptingUserEmail,
    data: { key: 'friends', value: { email: invitingUserEmail, notes: [] } },
    type: 'push',
  },
  {
    email: invitingUserEmail,
    data: { key: 'friends', value: { acceptingUserEmail, notes: [] } },
    type: 'push',
  },
];
