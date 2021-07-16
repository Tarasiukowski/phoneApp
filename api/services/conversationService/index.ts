import ConversationModel from '../../models/conversation/conversationModel';

class ConversationService {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async get() {
    const id = this.id;

    const data = await (await ConversationModel.find(id)).get();

    return data;
  }

  async send(email: string, content: string) {
    const id = this.id;

    const data = await (await ConversationModel.find(id)).send(content, email);

    return data;
  }
}

export default ConversationService;
