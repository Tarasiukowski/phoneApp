import DetailedChatUserList from '../../molecules/detailedChatUserList/detailedChatUset';
import Header from './header/header';
import Notes from './notes/notes';

import styles from './userDetailed.module.scss';
import { props } from './types';
import { keysToArray } from '../../../utils/keysToArray';

const UserDetailed = ({ email, number, ...restProps }: props) => {
  if (email) {
    return (
      <div className={styles.box}>
        <Header {...restProps} />
        <DetailedChatUserList list={keysToArray({ email, number })} />
        <Notes />
      </div>
    );
  }

  return <div className={styles.box}></div>;
};

export default UserDetailed;
