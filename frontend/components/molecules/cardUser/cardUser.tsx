import Avatar from './avatar/avatar';
import styles from './cardUser.module.scss';

const CardUser = () => {
  return (
    <div className={styles.template}>
      <Avatar />
    </div>
  );
};

export default CardUser;
