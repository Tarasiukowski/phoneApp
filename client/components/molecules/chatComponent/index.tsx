import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useScroll } from 'react-use';

import { Spinner } from 'components/atoms';
import Header from './header';
import { Textarea } from './textarea';
import Msg from './message';

import { useChatConnection } from 'hooks';
import { useFriends } from 'setup/reducers/friendsReducer';
import { props } from './types';
import { Member, Message } from 'interfaces';
import styles from './chat.module.scss';

const defaultWidth = '64.5vw';
const maxMessagesOnFetch = 20;
const maxScrollUp = 0;

const Chat = ({ id, getScopedUser, width }: props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [scopedUser, setScopedUser] = useState<Member | null>(null);
  const [valueTextarea, setValueTextarea] = useState('');

  const refMessagesTemplate = useRef<HTMLDivElement>(null);

  const { loading, sendMessage, onJoin, onMessage } = useChatConnection(id);
  const friends = useFriends();

  const { y } = useScroll(refMessagesTemplate);

  onJoin((messages, scopedUserEmail) => {
    const friend = friends.find((friend) => friend.email === scopedUserEmail);

    if (friend) {
      setScopedUser(friend);
      getScopedUser(friend);
    }

    setMessages(messages);
  });

  onMessage((message) => {
    setMessages((messages) => [...messages, message]);
  });

  useEffect(() => {
    if (y === maxScrollUp && messages.length >= maxMessagesOnFetch) {
      // TODO => fetch more messages
    }
  }, [y]);

  useEffect(() => {
    const messagesTemplate = refMessagesTemplate.current as HTMLDivElement;

    messagesTemplate.scrollTo(0, messagesTemplate.scrollHeight);
  }, [messages.length]);

  const textareaHandle = {
    onChange: (e: ChangeEvent) => {
      const target = e.target as HTMLTextAreaElement;

      setValueTextarea(target.value);
    },
    onKeyUp: (e: KeyboardEvent) => {
      if (e.key === 'Enter' && valueTextarea.length) {
        sendMessage(valueTextarea);
        setValueTextarea('');
      }
    },
  };

  return (
    <div className={styles.template} style={{ width: width ? width : defaultWidth }}>
      <Header user={scopedUser} />
      <div className={styles.messagesTemplate} ref={refMessagesTemplate}>
        <div className={styles.messagesList}>
          {loading && <Spinner mini />}
          {messages.map((message) => (
            <Msg {...message} data={messages} key={message.id} />
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
