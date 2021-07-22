import List from './list/list';
import Header from './header/header';
import Notes from './notes';

import { withLoading } from 'hoc';
import { props } from './types';
import { ListType } from '../usersList/types';
import { useFriends } from 'setup/reducers/friendsReducer';
import { useInvites } from 'setup/reducers/invitesReducer';
import styles from './userDetailes.module.scss';

const DefaultUserDetailes = () => <div className={styles.box} />;

const UserDetailes = withLoading(({ name = ListType.contacts, email }: props) => {
  const members = name === ListType.contacts ? useFriends() : useInvites();

  const member = members.find((member) => member.email === email);

  if (member) {
    const { notes, email, number } = member;

    return (
      <div className={styles.box}>
        <Header {...member} />
        <List data={{ email, number }} />
        {notes && <Notes data={notes} email={email} />}
      </div>
    );
  }

  return <DefaultUserDetailes />;
}, DefaultUserDetailes);

export { UserDetailes };
