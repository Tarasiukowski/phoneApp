import { Conversation } from 'interfaces';
import ConversationModel from '../../models/conversation/conversationModel';

class ConversationService {
  private constructor(
    private data: {
      succes: boolean;
      status: number;
      conversation: Conversation | null;
      errorMsg?: string;
    },
  ) {}

  get() {
    return this.data;
  }

  async send(email: string, content: string) {
    const { conversation } = this.data;

    if (conversation) {
      const id = conversation.id;

      const data = await (await ConversationModel.find(id)).send(content, email);

      return data;
    }

    return this.get();
  }

  static async find(id: string) {
    const data = await (await ConversationModel.find(id)).get();

    return new ConversationService(data);
  }
}

export default ConversationService;
