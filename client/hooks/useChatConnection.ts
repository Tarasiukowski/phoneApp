import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

import { useError } from 'contexts';
import { API_URL, paths } from '../constants';
import { useUser } from '../setup/reducers/userReducer/index';
import { ERROR_MESSAGES } from 'common';
import { Message } from 'interfaces';

type Error = {
  value: true;
  msg: string;
};

type Conversation = {
  messages: Message[];
  users: string[];
  id: string;
};

const socket = io(API_URL, { withCredentials: true });

export const useChatConnection = (id: string) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const loggedUser = useUser();
  const { setError } = useError();

  const sendMessage = (content: string) => {
    if (loggedUser) {
      const { email } = loggedUser;

      socket.emit('sendMessage', { content, email, id });
      return;
    }
  };

  const onJoin = (callback: (messages: Message[], friendEmail: string) => void) =>
    useEffect(() => {
      if (loggedUser) {
        const { email } = loggedUser;

        socket.emit(
          'join',
          { id, email },
          ({ conversation, error }: { conversation: Conversation; error: Error | null }) => {
            if (error) {
              setError({ msg: error.msg, id: Math.random() });
              return;
            }

            const { messages, users } = conversation;
            const friendEmail = users.find((email: string) => email !== loggedUser.email);

            if (friendEmail) {
              callback(messages, friendEmail);
              setLoading(false);
            }
          },
        );

        return () => {
          socket.off();
        };
      } else {
        setError({ msg: ERROR_MESSAGES.NOT_ALLOWED, id: Math.random() });
        router.push(paths.singUp);
      }
    }, [router.asPath]);

  const onMessage = (callback: (message: Message) => void) =>
    useEffect(() => {
      socket.on('message', ({ message }: { message: Message }) => {
        callback(message);
      });
    }, []);

  return { loading, onJoin, sendMessage, onMessage };
};
