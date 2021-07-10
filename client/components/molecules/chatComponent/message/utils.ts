import styles from './message.module.scss';

export const defineStyle = (prevMsgFromLogged: boolean, nextMsgFromLogged: boolean) => {
  if (prevMsgFromLogged && nextMsgFromLogged) {
    return styles.prevNext;
  } else if (prevMsgFromLogged) {
    return styles.prev;
  } else if (nextMsgFromLogged) {
    return styles.next;
  }

  return styles.def;
};

