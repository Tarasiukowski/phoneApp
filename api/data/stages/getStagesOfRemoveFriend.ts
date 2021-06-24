import { updateType } from "../../interfaces";

export const getStagesOfRemoveFriend = (
  email: string,
  friendEmail: string,
): { data: object; type: updateType }[] => [
  {
    data: { email, field: 'friends', value: { email: friendEmail } },
    type: 'pull',
  },
  {
    data: { email, field: 'conversations', value: { with: friendEmail } },
    type: 'pull',
  },
  {
    data: { email: friendEmail, field: 'friends', value: { email } },
    type: 'pull',
  },
  {
    data: { email: friendEmail, field: 'conversations', value: { with: email } },
    type: 'pull',
  },
];
