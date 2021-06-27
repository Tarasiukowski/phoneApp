import { randomColor, createNumber } from '../utils';

export const getDefaultDataUser = async () => {
  const number = await createNumber();

  return {
    invites: [],
    friends: [],
    conversations: [],
    groups: [],
    blocklist: [],
    colorImage: randomColor(),
    number,
    onBoarding: false,
  };
};
