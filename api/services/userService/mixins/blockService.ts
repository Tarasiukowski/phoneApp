import UserService from '..';
import { Class } from '../../../interfaces';
import UserModel from '../../../models/user/userModel';

export function BlockServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static block = {
      async index(loggedEmail: string, memberEmail: string) {
        const { user } = await UserModel.findOne('email', loggedEmail);

        const isFriend = user?.friends.find((friend) => friend.email === memberEmail);

        if (isFriend) {
          UserService.friend.remove(loggedEmail, memberEmail);
        } else {
          UserModel.update(
            { by: 'email', valueFilter: loggedEmail },
            { key: 'invites', value: memberEmail },
            'pull',
          );
        }
        const data = await UserModel.update(
          { by: 'email', valueFilter: loggedEmail },
          { key: 'blocklist', value: memberEmail },
          'push',
        );

        return data;
      },
      async get(email: string) {
        const { user } = await UserModel.findOne('email', email);
        const findedUser = user;

        const { blocklist = [] } = findedUser || {};

        const formatedUsersOfBlocklist = await UserModel.find(blocklist, 'email');

        return formatedUsersOfBlocklist;
      },
    };

    static unblock = {
      async index(loggedEmail: string, memberEmail: string) {
        const data = await UserModel.update(
          { by: 'email', valueFilter: loggedEmail },
          { key: 'blocklist', value: memberEmail },
          'push',
        );

        return data;
      },
    };
  };
}
