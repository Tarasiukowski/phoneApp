import UserModel from '../../models/user/userModel';

export const availabilityNumber = async (number: string): Promise<boolean> => {
  const user = await UserModel.findOne('number', number);

  if (user) {
    return false;
  }

  return true;
};
