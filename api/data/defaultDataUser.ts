import { randomColor, createNumber } from '../utils';

export const getDefaultDataUser = async () => {
  const number = await createNumber();

  return {
    invites: [],
    friends: [],
    tconversations: [],
    colorImage: randomColor(),
    number,
    onBoarding: false,
    groups: []
  };
};
