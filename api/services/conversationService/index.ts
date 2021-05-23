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

    const { succes, conversation } = await ConversationModel.get(id);

    if (succes) {
      const { users, messages } = conversation;

      const friendEmail = users.find((emailF) => {
        if (emailF !== email) {
          return emailF;
        }
      });

      return { succes, messages, email: friendEmail }
    }

    return { succes };
  }
}

export default ConversationService;
