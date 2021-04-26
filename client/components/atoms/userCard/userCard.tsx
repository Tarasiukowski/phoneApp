import ImageUser from '../imageUser/imageUser';
import styles from './userCard.module.scss';

const UserCard = () => {

  return (
    <div className={styles.box}>
      <ImageUser />
      <p className={styles.name}>Michał Tarasiuk</p>
    </div>
  );
};

export default UserCard;
