import { model } from 'mongoose';

import { generateCode, sendMail, formatUser, getUpdateOption } from '../../utils';
import { userSchema } from './userSchema';
import { UserDocument } from './types';
import { ERROR, getDefaultDataUser } from '../../data';
import { updateType, AuthType, User } from '../../interfaces';

export const userModel = model<UserDocument>('user', userSchema);

class UserModel {
  private constructor(private data: { status: number; user: UserDocument | User | null }) {}

  get() {
    return this.data;
  }

  format(...extraData: (keyof User)[]) {
    const { user, status } = this.data;

    const formatedUser = user ? formatUser(user, extraData) : user;

    return new UserModel({ user: formatedUser, status });
  }

  async update<K extends keyof User, T extends updateType>(
    data: {
      key: K;
      value: User[K] extends Array<any> ? Partial<User[K][number]> | string : User[K];
    },
    type: T,
  ) {
    const { user } = this.data;
    const { key, value } = data;

    if (type === 'newEmail') {
      const { user } = await (await UserModel.findOne('email', value)).get();

      if (user) {
        return { status: 401, errorMsg: ERROR.EMAIL_IN_USE };
      }
    }

    try {
      await userModel.updateOne({ email: user?.email }, getUpdateOption(key, value, type));

      return { status: 200, errorMsg: null };
    } catch (err) {
      return { status: 400, errorMsg: err };
    }
  }

  static async find<K extends keyof User, V extends User[K]>(data: V[], key: K, ...extraData: K[]) {
    const formatedData = (await data.map(async (elem) => {
      const { user } = await (await UserModel.findOne(key, elem)).get();

      if (user) {
        const formatedUser = formatUser(user, extraData);

        return formatedUser;
      }
    })) as Partial<User>[];

    return {
      data: await Promise.all(formatedData),
    };
  }

  static async findOne<K extends keyof UserDocument, V extends UserDocument[K]>(
    key: keyof UserDocument,
    value: V,
  ) {
    try {
      const user = await userModel.findOne({ [key]: value });

      return new UserModel({ status: 200, user });
    } catch (err) {
      return new UserModel({ status: 404, user: null });
    }
  }

  static async create(extraData: Partial<User>, settings: { authType: AuthType }) {
    const { email } = extraData;
    const { authType } = settings;

    let authOptions;

    if (authType === AuthType.email) {
      const code = await generateCode();
      const redirectTo = '/onboarding/code';

      email && sendMail(email, code);

      authOptions = { code, redirectTo };
    } else {
      const redirectTo = '/onboarding/code';

      authOptions = { redirectTo };
    }

    const defaultData = await getDefaultDataUser();

    const user = new userModel({ ...extraData, ...defaultData, ...authOptions });

    try {
      user.save();

      const formatedUser = formatUser(user);

      return { status: 200, user: { value: formatedUser, id: user._id } };
    } catch (err) {
      return { status: 400, user: null };
    }
  }
}

export default UserModel;
