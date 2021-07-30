import { User } from 'interfaces';
import { fetcher } from '../fetcher';

type ExtendedUser = User & {
  onBoarding: {
    value: boolean;
    stage: string | null;
  };
};

export const updateUser = <K extends keyof ExtendedUser>(key: K, value: ExtendedUser[K]) =>
  fetcher('PUT', `/user/update/${key}`, { value });

export const unblockUser = (email: string) =>
  fetcher('POST', '/user/unblock', { unblockedUserEmail: email });

export const blockUser = (email: string) =>
  fetcher('POST', '/user/block', {
    blockedUserEmail: email,
  });

export const verifyUser = (type: 'email' | 'account' | 'login', code: string) =>
  fetcher('POST', `/user/verify/${type}`, {
    code,
  });
