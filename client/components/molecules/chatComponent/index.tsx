import { ChangeEvent, useEffect, useRef, useState } from 'react';

import Header from './header';
import { Textarea } from './textarea';
import Message from './message';

import styles from './chat.module.scss';
import { props } from './types';
import { fetcher } from '../../../utils';

const Chat = ({ messages, user, id, width }: props) => {
  const [valueTextarea, setValueTextarea] = useState('');

  const refMessagesTemplate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesTemplate = refMessagesTemplate.current;

    messagesTemplate?.scrollTo(0, messagesTemplate.scrollHeight);
  });

  const textareaHandle = {
    onChange: (e: ChangeEvent) => {
      const target = e.target as HTMLTextAreaElement;

      setValueTextarea(target.value);
    },
    onKeyUp: (e: any) => {
      if (e.key === 'Enter' && valueTextarea.length) {
        fetcher('PUT', '/conversation/send', {
          content: valueTextarea,
          id,
        });

        setValueTextarea('');
      }
    },
  };

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
      <div className={styles.inputTemplate}>
        <Textarea value={valueTextarea} placeholder="Write a message..." {...textareaHandle} />
      </div>
    </div>
  );
};

export { Chat };
