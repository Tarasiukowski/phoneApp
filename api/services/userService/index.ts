import { ERROR } from '../../data';
import ConversationModel from '../../models/conversation/conversationModel';
import UserModel from '../../models/user/userModel';
import { By } from '../types';
import { FriendServiceMixin, InviteServiceMixin } from './mixins';

class UserService extends InviteServiceMixin(FriendServiceMixin(class {})) {
  email: string;
  by: By;

  static async update(data: any) {
    const { newEmail } = data;

    const returnedData = await UserModel.update(data, newEmail ? 'newEmail' : undefined);

    return returnedData;
  }

  static async verify(data, option: 'account' | 'email') {
    const { code, email } = data;
    const isVerifyAccount = option === 'account' ? true : false;

    const { status, user } = await UserModel.findOne('email', email);

    if (isVerifyAccount ? user.code === code : user.newEmail.code === code) {
      if (!isVerifyAccount) {
        const newEmail = user.newEmail.value;

        UserModel.update({ email, newEmail }, 'setEmail');

        const friends = await this.friend.get(email, 'conversations');

        friends.data.map((friend) => {
          UserModel.update({ email: friend.email, field: 'friends', value: email }, 'pull');
          UserModel.update(
            { email: friend.email, field: 'friends', value: newEmail },
            'pushToField',
          );

          friend.conversations.map((conversation) => {
            ConversationModel.update(conversation.id, { users: email }, '$pull');
            ConversationModel.update(conversation.id, { users: newEmail }, '$push');
          });
        });
      }

      return { valid: true, status, errorMsg: null };
    }

    return { valid: false, status: 401, errorMsg: ERROR.WRONG_VERIFICATION_CODE };
  }
}

export default UserService;
