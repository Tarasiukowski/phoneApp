import UserModel from '../../models/user/userModel';
import ConversationModel from '../../models/conversation/conversationModel';

class ConversationService {
  id: string;
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  send(content: string) {
    const { email, id } = this;

    const data = ConversationModel.send(content, email, id);

    return data;
  }

  async get() {
    const { id, email } = this;

    const { messages, users } = await await ConversationModel.get(id);
    const emailF: any = users.find((emailF) => {
      if (emailF !== email) {
        return emailF;
      }
    });
    const user = await UserModel.findOne('email', emailF);
    const formatedUser = await UserModel.format(user);

    return { messages, user: formatedUser };
  }
}

export default ConversationService;
