import http from 'http';
import { Server, Socket, ServerOptions } from 'socket.io';

import { conversationService } from '../services';
import { ERROR } from '../data/error';

const options: Partial<ServerOptions> = {
  cors: { origin: 'http://localhost:3000', credentials: true },
};

export const useSocketio = (server: http.Server) => {
  const io = new Server(server, options);

  io.on('connection', (socket: Socket) => {
    socket.on('join', async ({ id, email }, callback) => {
      const { conversation } = await conversationService(id).get(email);

      if (conversation) {
        socket.join(id);

        callback({ conversation, error: null });
      } else {
        callback({ conversation, error: { value: true, msg: ERROR.CONVERSATION_NOT_FOUND } });
      }
    });

    socket.on('sendMessage', async ({ content, email, id }) => {
      const { message } = await conversationService(id).send(email, content);

      socket.emit('message', { message });
      socket.to(id).emit('message', { message });
    });
  });
};
