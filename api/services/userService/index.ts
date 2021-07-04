import { ERROR } from '../../data';
import { updateType, User } from '../../interfaces';
import ConversationModel from '../../models/conversation/conversationModel';
import UserModel from '../../models/user/userModel';
import { FriendServiceMixin, InviteServiceMixin, BlockServiceMixin } from './mixins';

class UserService extends InviteServiceMixin(FriendServiceMixin(BlockServiceMixin(class {}))) {
  static async update<Key extends keyof User>(
    key: Key,
    data: User[Key] extends Array<any> ? User[Key][number] : User[Key],
    updateType: updateType,
  ) {
    const returnedData = await UserModel.update(key, data, updateType);

    return returnedData;
  }

  static async verify(data: { code: string; email: string }, type: 'account' | 'email') {
    const { code, email } = data;
    const accountVerification = type === 'account';

    const { status, user } = await UserModel.findOne('email', email);

    if (user) {
      const validCode = accountVerification ? user.code === code : user.newEmail.code === code;

      if (validCode) {
        if (!accountVerification) {
          const newEmail = user.newEmail.value;

          UserModel.update('email', { email, newEmail }, 'setEmail');

          const friends = await this.friend.get(email, 'conversations');

          friends.data.map(async (friend) => {
            UserModel.update('friends', { email: friend.email, value: email }, 'pull');
            UserModel.update('friends', { email: friend.email, value: newEmail }, 'push');

            const { user: formatedFriend } = await UserModel.findOne('email', friend.email);

            if (formatedFriend) {
              formatedFriend.conversations.map((conversation) => {
                const conversationId = conversation.id;

                ConversationModel.update(conversationId, 'users', email, 'pull');
                ConversationModel.update(conversationId, 'users', newEmail, 'push');
              });
            }
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
