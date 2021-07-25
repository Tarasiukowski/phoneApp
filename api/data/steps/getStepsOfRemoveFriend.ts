import { updateType, User } from '../../interfaces';

export const getStepsOfRemoveFriend = (
  email: string,
  friendEmail: string,
): {
  filter: { by: keyof User; valueFilter: User[keyof User] };
  data: any;
  type: updateType;
}[] => [
  {
    filter: { by: 'email', valueFilter: email },
    data: { key: 'friends', value: { email: friendEmail } },
    type: 'pull',
  },
  {
    filter: { by: 'email', valueFilter: email },
    data: { key: 'conversations', value: { with: friendEmail } },
    type: 'pull',
  },
  {
    filter: { by: 'email', valueFilter: friendEmail },
    data: { key: 'friends', value: { email } },
    type: 'pull',
  },
  {
    filter: { by: 'email', valueFilter: friendEmail },
    data: { key: 'conversations', value: { with: email } },
    type: 'pull',
  },
];
