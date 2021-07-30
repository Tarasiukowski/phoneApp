import { User } from 'interfaces';
import { fetcher } from '../fetcher';

type ExtendedUser = User & {
  onBoarding: {
    value: boolean;
    stage: string | null;
  };
};

// email: String,
// number: String,
// verify: {
//   code: String,
//   stage: String,
// },
// fullname: {
//   firstname: String,
//   lastname: String,
// },
// onBoarding: {
//   value: Boolean,
//   stage: String,
// },
// colorImage: String,
// newEmail: {
//   value: String,
//   code: String,
// },
// invites: [String],
// friends: [{ email: String, notes: [{ content: String }] }],
// image: String,
// conversations: [{ with: String, id: String }],
// groups: [{ name: String, members: [String] }],
// blocklist: [String],

export const updateUser = <K extends keyof ExtendedUser>(key: K, value: ExtendedUser[K]) =>
  fetcher('PUT', `/user/update/${key}`, { value });

export const unblockUser = (email: string) =>
  fetcher('POST', '/user/unblock', { unblockedUserEmail: email });

export const blockUser = (email: string) =>
  fetcher('POST', '/user/block', {
    blockedUserEmail: email,
  });

export const verifyUser = (type: 'email', code: string) =>
  fetcher('POST', `/user/verify/${type}`, {
    code,
  });
