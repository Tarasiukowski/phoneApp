import Avatar from './avatar/avatar';
import Description from './description/description';
import styles from './cardUser.module.scss';

const CardUser = () => {
  return (
    <div className={styles.template}>
      <Avatar />
      <Description />
    </div>
  );
};

export default CardUser;
