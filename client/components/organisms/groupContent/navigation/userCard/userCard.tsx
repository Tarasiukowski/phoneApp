import ImageUser from '../../../../atoms/imageUser/imageUser';

import styles from './userCard.module.scss';

const UserCard = () => (
  <div className={styles.box}>
    <ImageUser size="45px" />
    <div className={styles.content}>
      <p className={styles.name}>Michał Tarasiuk</p>
      <p className={styles.msg}>Some text msg</p>
    </div>
  </div>
);

export default UserCard;
