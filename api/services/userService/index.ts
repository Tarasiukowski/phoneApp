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

  static async update(key: keyof User, data: object, updateType: updateType) {
    const returnedData = await UserModel.update(key, data, updateType);

    return returnedData;
  }

  static async verify(data, type: 'account' | 'email') {
    const { code, email } = data;
    const isVerifyAccount = type === 'account';

    const { status, user } = await UserModel.findOne('email', email);

    if (isVerifyAccount ? user.code === code : user.newEmail.code === code) {
      if (!isVerifyAccount) {
        const newEmail = user.newEmail.value;

        UserModel.update('email', { email, newEmail }, 'setEmail');

        const friends = await this.friend.get(email, 'conversations');

        friends.data.map((friend) => {
          UserModel.update('friends', { email: friend.email, value: email }, 'pull');
          UserModel.update('friends', { email: friend.email, value: newEmail }, 'push');

          friend.conversations.map((conversation) => {
            ConversationModel.update(conversation.id, 'users', email, 'pull');
            ConversationModel.update(conversation.id, 'users', newEmail, 'push');
          });
        });
      }

      return { valid: true, status, errorMsg: null };
    }

    return { valid: false, status: 401, errorMsg: ERROR.WRONG_VERIFICATION_CODE };
  }
}

export default UserService;
