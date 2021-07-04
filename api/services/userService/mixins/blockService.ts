import UserService from '..';
import { Class, User } from '../../../interfaces';
import UserModel from '../../../models/user/userModel';

export function BlockServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static block = {
      async index(loggedEmail: string, memberEmail: string) {
        const { user: loggedUser } = await UserModel.findOne('email', loggedEmail);
        const adtiveUser = loggedUser as User;

        const isFriend = adtiveUser.friends.find((friend) => friend.email === memberEmail);

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
      async get(email: string) {
        const { user } = await UserModel.findOne('email', email);
        const findedUser = user as User;

        const emailsOfBlocklist = findedUser.blocklist;

        const formatedUsersOfBlocklist = await UserModel.find(emailsOfBlocklist, 'email');

        return formatedUsersOfBlocklist;
      },
    };

    static unblock = {
      async index(loggedEmail: string, memberEmail: string) {
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
