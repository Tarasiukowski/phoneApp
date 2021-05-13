import UserDetailed from '../../organisms/chatContent/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './usersList.module.scss';
import { SearchSvg } from '../../../public/svgs';
import { props } from './types';

const UsersList = ({ headerTitle }: props) => {
  return (
    <>
      <div className={styles.template}>
        <div className={styles.header}>
          <p>{headerTitle}</p>
          <span>1</span>
        </div>
        <div className={styles.content}>
          <div className={styles.inputTemplate}>
            <div>
              <SearchSvg />
            </div>
            <div>
              <input placeholder="Search" autoComplete="off" />
            </div>
          </div>
          <div className={styles.listElement}>
            <UserCard />
          </div>
        </div>
      </div>
      <UserDetailed />
    </>
  );
};

export default UsersList;
