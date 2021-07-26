import ConversationModel from '../../models/conversation/conversationModel';

export const conversationService = (id: string) => ({
  async get() {
    const conversationData = await (await ConversationModel.findById(id)).get();

    return conversationData;
  },
  async send(author: string, content: string) {
    const data = await (await ConversationModel.findById(id)).send(content, author);

    return data;
  },
});
