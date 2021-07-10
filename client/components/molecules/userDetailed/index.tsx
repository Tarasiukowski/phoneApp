import List from './list/list';
import Header from './header/header';
import Notes from './notes';

import { props } from './types';
import { formatToListData } from 'utils';
import { User } from 'interfaces';
import { useFriends } from 'setup/reducers/friendsReducer';
import styles from './userDetailed.module.scss';

const UserDetailed = ({ email, number, loading = false, ...restProps }: props) => {
  if (loading) return <div className={styles.box}></div>

  const friends = useFriends();

  const friend = friends.find((friend) => friend.email === email) as User;
  const dataOfNotes = friend?.notes;
  const userEmail = email as string;

  return (
    <div className={styles.box}>
      <Header email={email} {...restProps} />
      <List data={formatToListData({ email, number })} />
      {dataOfNotes && <Notes data={dataOfNotes} email={userEmail} />}
    </div>
  );
};

export { UserDetailed };
