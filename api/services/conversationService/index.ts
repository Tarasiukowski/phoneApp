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

    const data = await ConversationModel.get(id, email);

    return data;
  }
}

export default ConversationService;
