import { updateType, User } from '../../interfaces';

export const getStepsOfRemoveFriend = (
  loggedUserEmail: string,
  friendEmail: string,
): {
  email: string;
  data: any;
  type: updateType;
}[] => [
  {
    email: loggedUserEmail,
    data: { key: 'friends', value: { email: friendEmail } },
    type: 'pull',
  },
  {
    email: loggedUserEmail,
    data: { key: 'conversations', value: { with: friendEmail } },
    type: 'pull',
  },
  {
    email: friendEmail,
    data: { key: 'friends', value: { email: loggedUserEmail } },
    type: 'pull',
  },
  {
    email: friendEmail,
    data: { key: 'conversations', value: { with: loggedUserEmail } },
    type: 'pull',
  },
];
