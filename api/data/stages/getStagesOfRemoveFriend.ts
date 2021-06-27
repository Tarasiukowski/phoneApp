import { updateType } from "../../interfaces";
import { User } from "../../models/user/types";

export const getStagesOfRemoveFriend = (
  email: string,
  friendEmail: string,
): { key: keyof User, data: object; type: updateType }[] => [
  {
    key: 'friends',
    data: { email, value: { email: friendEmail } },
    type: 'pull',
  },
  {
    key: 'conversations',
    data: { email, value: { with: friendEmail } },
    type: 'pull',
  },
  {
    key: 'friends',
    data: { email: friendEmail, value: { email } },
    type: 'pull',
  },
  {
    key: 'conversations',
    data: { email: friendEmail, value: { with: email } },
    type: 'pull',
  },
];
