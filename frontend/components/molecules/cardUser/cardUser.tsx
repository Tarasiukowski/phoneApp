import Avatar from './avatar/avatar';
import Description from './description/description';
import Notes from './notes/notes';
import styles from './cardUser.module.scss';

const CardUser = () => {
  return (
    <div className={styles.template}>
      <Avatar />
      <Description />
      <Notes />
    </div>
  );
};

export default CardUser;
