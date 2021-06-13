import { updateOption } from "../interfaces";

export const getStagesOfRemoveFriend = (
  email: string,
  friendEmail: string,
): { data: object; option: updateOption }[] => [
  {
    data: { email, field: 'friends', value: friendEmail },
    option: 'pull',
  },
  {
    data: { email, field: 'conversations', value: { with: friendEmail } },
    option: 'pull',
  },
  {
    data: { email: friendEmail, field: 'friends', value: email },
    option: 'pull',
  },
  {
    data: { email: friendEmail, field: 'conversations', value: { with: email } },
    option: 'pull',
  },
];
