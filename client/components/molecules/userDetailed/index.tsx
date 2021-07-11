import List from './list/list';
import Header from './header/header';
import Notes from './notes';

import { props } from './types';
import { useFriends } from 'setup/reducers/friendsReducer';
import styles from './userDetailed.module.scss';

const UserDetailed = ({ email, loading = false }: props) => {
  const friends = useFriends();

  const friend = friends.find((friend) => friend.email === email);

  if (friend && !loading) {
    const { notes, email, number } = friend;

    return (
      <div className={styles.box}>
        <Header {...friend} />
        <List data={{ email, number }} />
        {notes && <Notes data={notes} email={email} />}
      </div>
    );
  }

  return <div className={styles.box}></div>;
};

export { UserDetailed };
