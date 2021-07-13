import { updateType, User } from '../interfaces';
import { generateCode } from './generateCode';

type UpdateType<T extends KeyOfTypes> = typeof types[T];
type KeyOfTypes = keyof typeof types;

const types = {
  DELETE: 'remove',
  PUT: 'set',
} as const;

export const getUpdateType = <T extends KeyOfTypes>(key: T): UpdateType<T> => types[key];

export const getUpdateOption = <K extends keyof User, T extends updateType>(
  key: K,
  value: User[K] extends Array<any> ? Partial<User[K][number]> | number : User[K],
  type: T,
): any => {
  const availableOptions = {
    remove: { $unset: { [key]: '' } },
    setEmail: { $set: { email: value } },
    set: { $set: { [key]: value } },
    newEmail: { $set: { newEmail: { value: value, code: generateCode() } } },
    push: { $push: { [key]: value } },
    pull: { $pull: { [key]: value } },
  };

  return availableOptions[type];
};

// FIX ME
