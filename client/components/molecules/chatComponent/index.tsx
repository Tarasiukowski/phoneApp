import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useScroll } from 'react-use';

import Header from './header';
import { Textarea } from './textarea';
import Msg from './message';

import { useError } from 'contexts';
import { Message, props } from './types';
import { fetcher, handleNotAllowedError } from 'utils';
import { Conversation, Member } from 'interfaces';
import { useFriends, useUser } from 'hooks';
import styles from './chat.module.scss';

const Chat = ({ id, getScopedUser, width }: props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [scopedUser, setScopedUser] = useState<Member | null>(null);
  const [valueTextarea, setValueTextarea] = useState('');
  const [loading, setLoading] = useState(true);

  const refMessagesTemplate = useRef<HTMLDivElement>(null);

  const activeUser = useUser();
  const friends = useFriends();
  const { setError } = useError();

  const { y } = useScroll(refMessagesTemplate);

  const fetchDataChat = async () => {
    if (id) {
      try {
        const { conversation } = await fetcher('POST', '/conversation', {
          id,
        });
        const { messages: fetchedMessages } = conversation;

        setMessages(fetchedMessages);
      } catch (err) {
        const { data, status } = err.response;
        const { errorMsg } = data;
        setError({ msg: errorMsg, id: Math.random() });
        handleNotAllowedError(status);
      }
    }
  };

  useEffect(() => {
    if (y === 0 && messages.length >= 20) {
    }
  }, [y]);

  useEffect(() => {
    if (id) {
      setLoading(true);

      fetchDataChat().then(() => {
        setLoading(false);
      });

      const scopedConversations = activeUser.conversations.find(
        (conversations) => conversations.id === id,
      ) as Conversation;

      const scopedFriend = friends.find(
        (friend) => friend.email === scopedConversations.with,
      ) as Member;

      setScopedUser(scopedFriend);
      getScopedUser(scopedFriend);
    }
  }, [id]);

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
        try {
          fetcher('PUT', '/conversation/send', {
            content: valueTextarea,
            id,
          });

          setValueTextarea('');
        } catch (err) {
          const { data, code } = err.response;
          const { errorMsg } = data;

          setError({ msg: errorMsg, id: Math.random() });

          handleNotAllowedError(code);
        }
      }
    },
  };

  if (!loading) {
    fetchDataChat();
  }

  return (
    <div className={styles.template} style={{ width: width ? width : '64.5vw' }}>
      <Header user={scopedUser} />
      <div className={styles.messagesTemplate} ref={refMessagesTemplate}>
        <div className={styles.messagesList}>
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
