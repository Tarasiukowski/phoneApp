import { UserCard, ButtonNavigation } from '../../index';

import { buttonsData, buttonNavigationSettings } from './data';
import { props } from './types';
import styles from './UserDetailed.module.scss';

const UserDetailed = ({ userDetailedRef }: props) => (
  <div className={styles.box} ref={userDetailedRef}>
    <div>
      <UserCard big />
    </div>
    <div className={styles.template}>
      {buttonsData.map((data) => (
        <ButtonNavigation key={data.content} {...data} {...buttonNavigationSettings} />
      ))}
    </div>
  </div>
);

export default UserDetailed;
