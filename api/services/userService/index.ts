import { ERROR } from '../../data';
import { updateType, User, VerifyOption, UpdateType } from '../../interfaces';
import ConversationModel from '../../models/conversation/conversationModel';
import UserModel from '../../models/user/userModel';
import { friendService, inviteService, blockService } from './extensions';

const getUserService = () => {
  const basicHandle = {
    async update<U extends keyof User, T extends updateType>(
      email: string,
      data: {
        key: U;
        value: User[U] extends Array<any> ? Partial<User[U][number]> | string : User[U];
      },
      type: T,
    ) {
      const { key, value } = data;

      const returnedData = await (await UserModel.findOne('email', email)).update(key, value, type);

      return returnedData;
    },

    async verify(email: string, code: string, type: VerifyOption) {
      const isEmailVerification = type === VerifyOption.email;

      const { status, user } = await (await UserModel.findOne('email', email)).get();

      if (user) {
        const verify = {
          newEmail: user.newEmail.code === code,
          account: user.verify.code === code,
        };

        const validCode = isEmailVerification ? verify.newEmail : verify.account;

        if (validCode) {
          if (isEmailVerification) {
            const newEmail = user.newEmail.value;

            (await UserModel.findOne('email', email)).update('email', newEmail, 'setEmail');

            const { data: friends } = await friendService.friend.get(email, 'conversations');

            friends.map(async (friend) => {
              (await UserModel.findOne('email', friend.email)).update('friends', email, 'pull');
              (await UserModel.findOne('email', friend.email)).update('friends', newEmail, 'push');

              const { conversations = [] } = friend || {};

              conversations.map(async (conversation) => {
                const { id } = conversation;

                await (
                  await ConversationModel.findById(id)
                ).updateMany([
                  { key: 'users', value: email, type: UpdateType.push },
                  { key: 'users', value: newEmail, type: UpdateType.push },
                ]);
              });
            });
          } else {
            await (
              await UserModel.findOne('email', email)
            ).update('verify', { ...user.verify }, 'remove');
          }

          return { valid: true, status, errorMsg: null };
        }

        return { valid: false, status: 401, errorMsg: ERROR.WRONG_VERIFICATION_CODE };
      }

      return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
    },
  };

  return Object.assign(basicHandle, friendService, inviteService, blockService);
};

export const userService = getUserService();
