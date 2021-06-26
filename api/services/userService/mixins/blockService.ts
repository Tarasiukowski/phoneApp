import { Class } from '../../../interfaces';
import UserModel from '../../../models/user/userModel';
import { ERROR } from '../../../data/error';

export function BlockServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static block = {
      async index(loggedEmail: string, memberEmail: string) {
        const { user: member } = await UserModel.findOne('email', memberEmail);

        if (!member) {
          return { status: 404, errorMsg: ERROR.USER_EXIST };
        }

        const { user: loggedUser } = await UserModel.findOne('email', loggedEmail);

        return { status: 200 };
      },
    };
  };
}
