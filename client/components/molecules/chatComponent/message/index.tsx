import cl from 'classnames';

import { useUser } from 'setup/reducers/userReducer';
import { props } from './types';
import { defineStyle } from './utils';
import styles from './message.module.scss';

const MessageComponent = ({ content, id, data }: props) => {
  const user = useUser();

  const messageIndex = data.findIndex((message) => message.id === id);

  const msgs = {
    currentMsg: data[messageIndex],
    previousMsg: data[messageIndex - 1],
    nextMsg: data[messageIndex + 1],
  };

  const { currentMsg, previousMsg, nextMsg } = msgs;

  const isFromLoggedUser = {
    currentMsg: currentMsg ? currentMsg.from === user?.email : false,
    previousMsg: previousMsg ? previousMsg.from === currentMsg.from : false,
    nextMsg: nextMsg ? nextMsg.from === currentMsg.from : false,
  };

  const marginTop = messageIndex !== 0 && !isFromLoggedUser.previousMsg ? '10px' : undefined;

  const messageTemplateClasses = cl(
    styles.messageTemplate,
    isFromLoggedUser.currentMsg ? styles.logged : styles.notLogged,
  );

  const messageClasses = cl(
    styles.message,
    defineStyle(isFromLoggedUser.previousMsg, isFromLoggedUser.nextMsg),
  );

  return (
    <div className={messageTemplateClasses} style={{ marginTop }}>
      <div className={messageClasses}>{content}</div>
    </div>
  );
};

export default MessageComponent;
