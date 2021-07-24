import UserService from '..';
import { Class } from '../../../interfaces';
import UserModel from '../../../models/user/userModel';

export function BlockServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static block = {
      async index(loggedEmail: string, memberEmail: string) {
        const { user } = await (await UserModel.findOne('email', loggedEmail)).get();
        const { friends = [] } = user || {};

        const isFriend = friends.some((friend) => friend.email === memberEmail);

        if (isFriend) {
          UserService.friend.remove(loggedEmail, memberEmail);
        } else {
          (await UserModel.findOne('email', loggedEmail)).update(
            { key: 'invites', value: memberEmail },
            'pull',
          );
        }
        const data = await (
          await UserModel.findOne('email', loggedEmail)
        ).update({ key: 'blocklist', value: memberEmail }, 'push');

        return data;
      },
      async get(email: string) {
        const { user } = await (await UserModel.findOne('email', email)).get();
        const findedUser = user;

        const { blocklist = [] } = findedUser || {};

        const formatedUsersOfBlocklist = await UserModel.find(blocklist, 'email');

        return formatedUsersOfBlocklist;
      },
    };

    static unblock = {
      async index(loggedEmail: string, memberEmail: string) {
        const data = await (
          await UserModel.findOne('email', loggedEmail)
        ).update({ key: 'blocklist', value: memberEmail }, 'push');

        return data;
      },
    };
  };
}
