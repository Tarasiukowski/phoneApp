import UserService from '..';
import { Class } from '../../../interfaces';
import UserModel from '../../../models/user/userModel';

export function BlockServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static block = {
      async index(blockingUserEmail: string, blockedUserEmail: string) {
        const { user: blockingUser } = await (
          await UserModel.findOne('email', blockingUserEmail)
        ).get();
        const { friends = [] } = blockingUser || {};

        const isFriend = friends.some((friend) => friend.email === blockedUserEmail);

        if (isFriend) {
          UserService.friend.remove(blockingUserEmail, blockedUserEmail);
        } else {
          (await UserModel.findOne('email', blockingUserEmail)).update(
            'invites',
            blockedUserEmail,
            'push',
          );
        }

        const data = await (
          await UserModel.findOne('email', blockingUserEmail)
        ).update('blocklist', blockedUserEmail, 'push');

        return data;
      },
      async get(loggedUserEmail: string) {
        const { user: loggedUser } = await (
          await UserModel.findOne('email', loggedUserEmail)
        ).get();

        const { blocklist = [] } = loggedUser || {};

        const formatedUsersOfBlocklist = await UserModel.findAllBy('email', blocklist);

        return formatedUsersOfBlocklist;
      },
    };

    static unblock = {
      async index(unblockingUserEmail: string, unblockedUserEmail: string) {
        const data = await (
          await UserModel.findOne('email', unblockingUserEmail)
        ).update('blocklist', unblockedUserEmail, 'push');

        return data;
      },
    };
  };
}
