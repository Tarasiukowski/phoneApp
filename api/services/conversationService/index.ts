import ConversationModel from '../../models/conversation/conversationModel';

class ConversationService {
  conversationId: string;

  constructor(conversationId: string) {
    this.conversationId = conversationId;
  }

  async get() {
    const id = this.conversationId;

    const conversation = await (await ConversationModel.findById(id)).get();

    return conversation;
  }

  async send(author: string, content: string) {
    const id = this.conversationId;

    const data = await (await ConversationModel.findById(id)).send(content, author);

    return data;
  }
}

export default ConversationService;
