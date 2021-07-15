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

  send(email: string, content: string) {
    const { conversation } = this.data;

    if (conversation) {
      const data = ConversationModel.send(content, email, conversation.id);

      data;
    }

    return this.get();
  }

  get() {
    return this.data;
  }

  static async find(id: string) {
    const data = await ConversationModel.get(id);

    return new ConversationService(data);
  }
}

export default ConversationService;
