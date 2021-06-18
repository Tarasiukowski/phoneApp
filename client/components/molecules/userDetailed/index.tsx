import { useSelector } from 'react-redux';

import List from './list/list';
import Header from './header/header';
import Notes from './notes';

import { props } from './types';
import { formatToListData } from '../../../utils';
import { User } from '../../../interfaces';
import { selectFriends } from '../../../reducers/friendsReducer';
import styles from './userDetailed.module.scss';

const UserDetailed = ({ email, number, loading = false, ...restProps }: props) => {
  if (!loading) {
    const friends = useSelector(selectFriends);
    const friend = friends.find((friend) => friend.email === email) as User;
    const dataOfNotes = friend?.notes;
    const userEmail = email as string;

    return (
      <div className={styles.box}>
        <Header {...restProps} />
        <List list={formatToListData({ email, number })} />
        {dataOfNotes && <Notes data={dataOfNotes} email={userEmail} />}
      </div>
    );
  }

  return <div className={styles.box}></div>;
};

export { UserDetailed };
