import { updateType } from '../interfaces';
import { User } from '../models/user/types';
import { generateCode } from './generateCode';

type Types = {
  DELETE: 'remove';
  PUT: 'set';
};
type UpdateType<T extends KeyOfTypes> = typeof types[T];
type KeyOfTypes = keyof typeof types;

const types: Types = {
  DELETE: 'remove',
  PUT: 'set',
};

export const getUpdateType = <T extends KeyOfTypes>(key: T): UpdateType<T> => types[key];

export const getUpdateOption = (key: keyof User, data, type: updateType): any  => {
  const { newEmail, value } = data;

  const availableOptions = {
    remove: { $unset: { [key]: '' } },
    setEmail: { $set: { [key]: newEmail } },
    set: { $set: { ...data } },
    newEmail: { $set: { newEmail: { value: newEmail, code: generateCode() } } },
    push: { $push: { [key]: value } },
    pull: { $pull: { [key]: value } },
  };

  return availableOptions[type];
};
