import List from './list/list';
import Header from './header/header';
import Notes from './notes';

import styles from './userDetailed.module.scss';
import { props } from './types';
import { formatToListData } from '../../../utils';

const UserDetailed = ({ email, number, loading = false, ...restProps }: props) => {
  if (!loading) {
    return (
      <div className={styles.box}>
        <Header {...restProps} />
        <List list={formatToListData({ email, number })} />
        <Notes />
      </div>
    );
  }

  return <div className={styles.box}></div>;
};

export { UserDetailed };
