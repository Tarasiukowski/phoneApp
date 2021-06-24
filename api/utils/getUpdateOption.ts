import { updateType } from '../interfaces';
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

export const getUpdateOption = (data, type: updateType) => {
  const { newEmail, field, value } = data;

  const availableOptions: any = {
    remove: { $unset: { [field]: '' } },
    setEmail: { $set: { email: newEmail } },
    set: { $set: { ...data } },
    newEmail: { $set: { newEmail: { value: newEmail, code: generateCode() } } },
    push: { $push: { [field]: value } },
    pull: { $pull: { [field]: value } },
  };

  return availableOptions[type];
};
