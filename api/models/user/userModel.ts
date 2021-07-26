import { model } from 'mongoose';

import { generateCode, sendMail, formatUser, getUpdateOption } from '../../utils';
import { userSchema } from './userSchema';
import { UserDocument } from './types';
import { ERROR, getDefaultDataUser, paths } from '../../data';
import { updateType, AuthType, User } from '../../interfaces';

export const userModel = model<UserDocument>('user', userSchema);

class UserModel<F extends boolean> {
  private constructor(
    private data: {
      status: number;
      user: (F extends true ? User : UserDocument) | null;
      formated: F;
    },
  ) {}

  get() {
    return this.data;
  }

  format(...extraKeys: (keyof User)[]) {
    const { user, status } = this.data;

    const formatedUser = user ? formatUser(user, extraKeys) : user;

    return new UserModel({ user: formatedUser, status, formated: true });
  }

  async update<K extends keyof User, T extends updateType>(
    key: K,
    value: User[K] extends Array<any> ? Partial<User[K][number]> | string : User[K],
    type: T,
  ) {
    const { user } = this.data;

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

  static async findAllBy<K extends keyof User, V extends User[K]>(
    key: K,
    data: V[],
    ...extraKeys: (keyof User)[]
  ) {
    const findedUsers = (await data.map(async (elem) => {
      const { user } = await (await UserModel.findOne(key, elem)).get();

      if (user) {
        const formatedUser = formatUser(user, extraKeys);

        return formatedUser;
      }
    })) as Partial<User>[];

    return {
      data: await Promise.all(findedUsers),
    };
  }

  static async findOne<K extends keyof UserDocument, V extends UserDocument[K]>(
    key: keyof UserDocument,
    value: V,
  ) {
    try {
      const user = await userModel.findOne({ [key]: value });

      return new UserModel({ status: 200, user, formated: false });
    } catch (err) {
      return new UserModel({ status: 404, user: null, formated: false });
    }
  }

  static async create(extraData: Partial<User>, settings: { authType: AuthType }) {
    const { email } = extraData;
    const { authType } = settings;

    let authOptions: Partial<User>;

    if (authType === AuthType.email) {
      const code = await generateCode();

      email && sendMail(email, code);

      authOptions = {
        verify: { code, stage: paths.onBoarding.code },
        onBoarding: { value: false, stage: paths.onBoarding.code },
      };
    } else {
      authOptions = { onBoarding: { value: false, stage: paths.onBoarding.number } };
    }

    const defaultDataUser = await getDefaultDataUser();

    const user = new userModel({ ...extraData, ...defaultDataUser, ...authOptions });

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
