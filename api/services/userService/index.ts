import { ERROR } from '../../data';
import { updateType, User, VerifyOption } from '../../interfaces';
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
    const returnedData = await UserModel.update(filter, data, type);

    return returnedData;
  }

  static async verify(data: { code: string; email: string }, type: VerifyOption) {
    const { code, email } = data;
    const emailVerification = type === VerifyOption.email;

    const { status, user } = await UserModel.findOne('email', email);

    if (user) {
      const verify = {
        newEmail: user.newEmail.code === code,
        account: user.code === code,
      };

      const validCode = emailVerification ? verify.newEmail : verify.account;

      if (validCode) {
        if (emailVerification) {
          const newEmail = user.newEmail.value;

          UserModel.update(
            { by: 'email', valueFilter: email },
            { key: 'email', value: newEmail },
            'setEmail',
          );

          const friends = await this.friend.get(email, 'conversations');

          friends.data.map(async (friend) => {
            if (friend.email) {
              UserModel.update(
                { by: 'email', valueFilter: friend.email },
                { key: 'friends', value: email },
                'pull',
              );
              UserModel.update(
                { by: 'email', valueFilter: friend.email },
                { key: 'friends', value: newEmail },
                'push',
              );
            }

            const { conversations = [] } = friend || {};

            conversations.map((conversation) => {
              const conversationId = conversation.id;

              ConversationModel.update(conversationId, 'users', email, 'pull');
              ConversationModel.update(conversationId, 'users', newEmail, 'push');
            });
          });
        }

        return { valid: true, status, errorMsg: null };
      }

      return { valid: false, status: 401, errorMsg: ERROR.WRONG_VERIFICATION_CODE };
    }

    return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
  }
}

export default UserService;
