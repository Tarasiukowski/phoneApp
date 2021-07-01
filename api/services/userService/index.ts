import { ERROR } from '../../data';
import { updateType } from '../../interfaces';
import ConversationModel from '../../models/conversation/conversationModel';
import { User } from '../../models/user/types';
import UserModel from '../../models/user/userModel';
import { By } from '../types';
import { FriendServiceMixin, InviteServiceMixin, BlockServiceMixin } from './mixins';

class UserService extends InviteServiceMixin(FriendServiceMixin(BlockServiceMixin(class {}))) {
  email: string;
  by: By;

  static async update<Key extends keyof User>(
    key: Key,
    data: User[Key] extends Array<any> ? User[Key][number] : User[Key],
    updateType: updateType,
  ) {
    const returnedData = await UserModel.update(key, data, updateType);

    return returnedData;
  }

  static async verify(data, type: 'account' | 'email') {
    const { code, email } = data;
    const accountVerification = type === 'account';

    const { status, user } = await UserModel.findOne('email', email);

    const validCode = accountVerification ? user.code === code : user.newEmail.code === code;

    if (validCode) {
      if (!accountVerification) {
        const newEmail = user.newEmail.value;

        UserModel.update('email', { email, newEmail }, 'setEmail');

        const friends = await this.friend.get(email, 'conversations');

        friends.data.map((friend) => {
          UserModel.update('friends', { email: friend.email, value: email }, 'pull');
          UserModel.update('friends', { email: friend.email, value: newEmail }, 'push');

          friend.conversations.map((conversation) => {
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
}

export default UserService;
