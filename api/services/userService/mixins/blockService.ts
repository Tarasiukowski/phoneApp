import UserService from '..';
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

        const isFriend = loggedUser.friends.find((friend) => friend.email === memberEmail);

        if (isFriend) {
          UserService.friend.remove(loggedEmail, memberEmail);
        } else {
          UserModel.update('invites', { email: loggedEmail, value: memberEmail }, 'pull');
        }

        const data = await UserModel.update(
          'blocklist',
          { email: loggedEmail, value: memberEmail },
          'push',
        );

        return data;
      },
      async get(email) {
        const { user } = await UserModel.findOne('email', email);

        const emailsOfBlocklist = user.blocklist;

        const formatedUsersOfBlocklist = await UserModel.find(emailsOfBlocklist, 'email');

        return formatedUsersOfBlocklist
      },
      async unlock(loggedEmail: string, memberEmail: string) {
        const data = await UserModel.update(
          'blocklist',
          { email: loggedEmail, value: memberEmail },
          'pull',
        );

        return data;
      },
    };
  };
}
