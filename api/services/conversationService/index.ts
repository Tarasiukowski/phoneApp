import ConversationModel from '../../models/conversation/conversationModel';

export const conversationService = (id: string) => ({
  async get(loggedUserEmail: string) {
    const conversationData = await (await ConversationModel.findById(id)).get(loggedUserEmail);

    return conversationData;
  },
  async send(author: string, content: string) {
    const data = await (await ConversationModel.findById(id)).send(content, author);

    return data;
  },
});
