import UserModel from '../../models/user/userModel';

export const availabilityNumber = async (number: string): Promise<boolean> => {
  const { user } = await (await UserModel.findOne('number', number)).get();

  if (user) {
    return false;
  }

  return true;
};
