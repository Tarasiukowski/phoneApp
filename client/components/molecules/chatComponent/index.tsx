import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useScroll } from 'react-use';
import { useRouter } from 'next/router';

import { Spinner } from 'components/atoms';
import Header from './header';
import { Textarea } from './textarea';
import Msg from './message';

import { useError } from 'contexts';
import { Message, props } from './types';
import { fetcher, handleRequestError } from 'utils';
import { Member } from 'interfaces';
import { useFriends } from 'setup/reducers/friendsReducer';
import { useUser } from 'setup/reducers/userReducer';
import styles from './chat.module.scss';
import { paths } from '../../../constants';

const Chat = ({ id, getScopedUser, width }: props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [scopedUser, setScopedUser] = useState<Member | null>(null);
  const [valueTextarea, setValueTextarea] = useState('');
  const [loading, setLoading] = useState(true);

  const refMessagesTemplate = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const activeUser = useUser();
  const friends = useFriends();
  const { setError } = useError();

  const { y } = useScroll(refMessagesTemplate);

  const fetchDataChat = async () => {
    try {
      const { conversation } = await fetcher('POST', '/conversation', {
        id,
      });
      const { messages: fetchedMessages } = conversation;

      setMessages(fetchedMessages);
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  };

  useEffect(() => {
    if (y === 0 && messages.length >= 20) {
    }
  }, [y]);

  useEffect(() => {
    setLoading(true);
    setMessages([]);

    fetchDataChat()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        router.push(paths.Contacts);
      });

    if (activeUser) {
      const scopedConversations = activeUser.conversations.find(
        (conversations) => conversations.id === id,
      );

      if (scopedConversations) {
        const scopedFriend = friends.find((friend) => friend.email === scopedConversations?.with);

        if (scopedFriend) {
          setScopedUser(scopedFriend);
          getScopedUser(scopedFriend);
        }
      }
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
          handleRequestError(err, (errorMsg) => {
            setError({ msg: errorMsg, id: Math.random() });
          });
        }
      }
    },
  };

  return (
    <div className={styles.template} style={{ width: width ? width : '64.5vw' }}>
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
