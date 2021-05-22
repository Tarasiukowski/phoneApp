import { useSelector } from 'react-redux';
import cl from 'classnames';

import { props } from './types';
import styles from './message.module.scss';
import { selectUser } from '../../../../reducers/userReducer';

const MessageComponent = ({ content, from, id, messagesData }: props) => {
  const { email } = useSelector(selectUser);

  const isLoggedUser = from === email;

  const messageIndex = messagesData.findIndex((message) => message.id === id);

  const currentMsg = messagesData[messageIndex];
  const previousMsg = messagesData[messageIndex - 1];
  const nextMsg = messagesData[messageIndex + 1];

  const previousMsgIsFromLogged = previousMsg ? previousMsg.from === currentMsg.from : false;
  const nextMsgIsFromLogged = nextMsg ? nextMsg.from === currentMsg.from : false;

  const messageTemplateClasses = cl(
    styles.messageTemplate,
    isLoggedUser ? styles.logged : styles.notLogged,
  );

  const messageClasses = cl(
    styles.message,
    defineStyle(previousMsgIsFromLogged, nextMsgIsFromLogged),
  );

  return (
    <div className={messageTemplateClasses}>
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
