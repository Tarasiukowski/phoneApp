import User from '../../models/user/userModel';

export const availabilityNumber = async (number: string): Promise<boolean> => {
  const user = await User.find('number', number);

  if (user) {
    return false;
  }

  return true;
};
