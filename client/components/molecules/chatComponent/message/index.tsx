import { useSelector } from 'react-redux';
import cl from 'classnames';

import { props } from './types';
import { Message } from '../types';
import { selectUser } from '../../../../reducers/userReducer';
import styles from './message.module.scss';

const MessageComponent = ({ content, from, id, data }: props) => {
  const { email } = useSelector(selectUser);

  const isLoggedUser = from === email;

  const messageIndex = data.findIndex((message) => message.id === id);

  const currentMsg = data[messageIndex];
  const previousMsg = data[messageIndex - 1] as Message;
  const nextMsg = data[messageIndex + 1] as Message;

  const previousMsgIsFromLogged = previousMsg ? previousMsg.from === currentMsg.from : false;
  const nextMsgIsFromLogged = nextMsg ? nextMsg.from === currentMsg.from : false;

  const withMarginTop = messageIndex !== 0 && !previousMsgIsFromLogged ? '10px' : undefined;

  const messageTemplateClasses = cl(
    styles.messageTemplate,
    isLoggedUser ? styles.logged : styles.notLogged,
  );

  const messageClasses = cl(
    styles.message,
    defineStyle(previousMsgIsFromLogged, nextMsgIsFromLogged),
  );

  return (
    <div className={messageTemplateClasses} style={{ marginTop: withMarginTop && '24px' }}>
      <div className={messageClasses}>{content}</div>
    </div>
  );
};

const defineStyle = (prevMsgFromLogged: boolean, nextMsgFromLogged: boolean) => {
  if (prevMsgFromLogged && nextMsgFromLogged) {
    return styles.prevNext;
  } else if (prevMsgFromLogged) {
    return styles.prev;
  } else if (nextMsgFromLogged) {
    return styles.next;
  }

  return styles.def;
};

export default MessageComponent;
