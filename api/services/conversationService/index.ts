import ConversationModel from '../../models/conversation/conversationModel';

class ConversationService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  send(email: string, content: string) {
    const { id } = this;

    const data = ConversationModel.send(content, email, id);

    return data;
  }

  async get() {
    const { id } = this;

    const data = await ConversationModel.get(id);

    return data;
  }
}

export default ConversationService;
