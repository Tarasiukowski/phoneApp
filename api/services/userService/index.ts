import { ERROR } from '../../data';
import { updateType, User, VerifyOption, UpdateType } from '../../interfaces';
import ConversationModel from '../../models/conversation/conversationModel';
import UserModel from '../../models/user/userModel';
import { FriendServiceMixin, InviteServiceMixin, BlockServiceMixin } from './mixins';

class UserService extends InviteServiceMixin(FriendServiceMixin(BlockServiceMixin(class {}))) {
  static async update<K extends keyof User, U extends keyof User, T extends updateType>(
    filter: { by: K; valueFilter: User[K] },
    data: {
      key: U;
      value: User[U] extends Array<any> ? Partial<User[U][number]> | string : User[U];
    },
    type: T,
  ) {
    const { by, valueFilter } = filter;

    const returnedData = await (await UserModel.findOne(by, valueFilter)).update(data, type);

    return returnedData;
  }

  static async verify(data: { code: string; email: string }, type: VerifyOption) {
    const { code, email } = data;
    const emailVerification = type === VerifyOption.email;

    const { status, user } = await (await UserModel.findOne('email', email)).get();

    if (user) {
      const verify = {
        newEmail: user.newEmail.code === code,
        account: user.verify.code === code,
      };

      const validCode = emailVerification ? verify.newEmail : verify.account;

      if (validCode) {
        if (emailVerification) {
          const newEmail = user.newEmail.value;

          (await UserModel.findOne('email', email)).update(
            { key: 'email', value: newEmail },
            'setEmail',
          );

          const friends = await this.friend.get(email, 'conversations');

          friends.data.map(async (friend) => {
            if (friend.email) {
              (await UserModel.findOne('email', friend.email)).update(
                { key: 'friends', value: email },
                'pull',
              );

              (await UserModel.findOne('email', friend.email)).update(
                { key: 'friends', value: newEmail },
                'push',
              );
            }

            const { conversations = [] } = friend || {};

            conversations.map(async (conversation) => {
              const { id } = conversation;

              await (
                await ConversationModel.find(id)
              ).updateMany([
                { key: 'users', value: email, type: UpdateType.push },
                { key: 'users', value: newEmail, type: UpdateType.push },
              ]);
            });
          });
        } else {
          await (
            await UserModel.findOne('email', email)
          ).update({ key: 'verify', value: { ...user.verify } }, 'remove');
        }

        return { valid: true, status, errorMsg: null };
      }

      return { valid: false, status: 401, errorMsg: ERROR.WRONG_VERIFICATION_CODE };
    }

    return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
  }
}

export default UserService;
