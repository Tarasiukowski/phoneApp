import { fetcher } from '../fetcher';

export const removeFriend = (email: string) =>
  fetcher('POST', '/user/friends/remove', {
    friend: email,
  });

export const getFriends = () => fetcher('POST', '/user/friends')