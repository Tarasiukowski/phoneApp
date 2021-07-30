import { fetcher } from '../fetcher';

export const invite = (email: string) =>
  fetcher('POST', '/user/invite', {
    invitedUserEmail: email,
  });

export const acceptInvite = (email: string) =>
  fetcher('POST', '/user/invite/accept', {
    invitingUserEmail: email,
  });
