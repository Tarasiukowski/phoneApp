import { generateCode } from './generateCode';
import { updateOption } from '../interface';

export const getUpdateOption = (data, option: updateOption, setEmail?: boolean) => {
  const { newEmail, field, value } = data;

  const availableOptions: any = {
    removeField: { $unset: { [field]: '' } },
    setField: { $set: setEmail ? { email: newEmail } : { ...data } },
    newEmail: { $set: { newEmail: { value: newEmail, code: generateCode() } } },
    pushToField: { $push: { [field]: value } },
    pull: { $pull: { [field]: value } },
  };

  return availableOptions[option]
};
