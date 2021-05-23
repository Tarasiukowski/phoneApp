import DetailedChatUserList from '../../molecules/detailedChatUserList/detailedChatUset';
import Header from './header/header';
import Notes from './notes/notes';

import styles from './userDetailed.module.scss';
import { props } from './types';
import { formatToListData } from '../../../utils';

const UserDetailed = ({ email, number, loading = false, ...restProps }: props) => {
  if (!loading) {
    return (
      <div className={styles.box}>
        <Header {...restProps} />
        <DetailedChatUserList list={formatToListData({ email, number })} />
        <Notes />
      </div>
    );
  }

  return <div className={styles.box}></div>;
};

export default UserDetailed;
