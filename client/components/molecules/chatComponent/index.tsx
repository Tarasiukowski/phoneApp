import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './header';
import { Textarea } from './textarea';
import Message from './message';

import { selectFriends } from '../../../reducers/friendsReducer';
import { ChatData } from '../../organisms/groupContent/types';
import { props } from './types';
import { fetcher } from '../../../utils';
import { User } from '../../../interfaces';
import styles from './chat.module.scss';

const Chat = ({ id, onFetchData, width }: props) => {
  const [dataChat, setDataChat] = useState<ChatData>({ user: null, messages: [] });
  const [valueTextarea, setValueTextarea] = useState('');

  const refMessagesTemplate = useRef<HTMLDivElement>(null);

  const friends = useSelector(selectFriends);

  const { user, messages } = dataChat;

  const fetchDataChat = async (url: string) => {
    if (id) {
      const { conversation } = await fetcher('POST', url, {
        id,
      });

      const { email, messages } = conversation;

      const friend = friends.find((friend) => {
        if (friend.email === email) {
          return friend;
        }
      }) as User;

      setDataChat({ messages, user: friend });

      onFetchData(dataChat);
    }
  };

  useEffect(() => {
    const messagesTemplate = refMessagesTemplate.current;

    messagesTemplate?.scrollTo(0, messagesTemplate.scrollHeight);
  }, [messages.length]);

  const textareaHandle = {
    onChange: (e: ChangeEvent) => {
      const target = e.target as HTMLTextAreaElement;

      setValueTextarea(target.value);
    },
    onKeyUp: (e: KeyboardEvent) => {
      if (e.key === 'Enter' && valueTextarea.length) {
        fetcher('PUT', '/conversation/send', {
          content: valueTextarea,
          id,
        });

        setValueTextarea('');
      }
    },
  };

  fetchDataChat('/conversation');

  return (
    <div className={styles.template} style={{ width: width ? width : '64.5vw' }}>
      <Header user={user} />
      <div className={styles.messagesTemplate} ref={refMessagesTemplate}>
        <div className={styles.messagesList}>
          {messages.map((message) => (
            <Message {...message} data={messages} key={message.id} />
          ))}
        </div>
      </div>
      <div className={styles.textareaTemplate}>
        <Textarea value={valueTextarea} placeholder="Write a message..." {...textareaHandle} />
      </div>
    </div>
  );
};

export { Chat };
