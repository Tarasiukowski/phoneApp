import { generateCode } from './generateCode';
import { updateOption } from '../interface';

export const getUpdateOption = (data, option: updateOption, setEmail?: boolean) => {
  const { newEmail, fieldName, pushValue, removeValue } = data;

  const availableOptions: any = {
    removeField: { $unset: { [fieldName]: '' } },
    setField: { $set: setEmail ? { email: newEmail } : { ...data } },
    newEmail: { $set: { newEmail: { value: newEmail, code: generateCode() } } },
    pushToField: { $push: { [fieldName]: pushValue } },
    pull: { $pull: { [fieldName]: removeValue } },
  };

  return availableOptions[option]
};
