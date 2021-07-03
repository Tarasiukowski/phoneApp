import { ImageUser } from 'components/atoms';

import { useUser } from 'hooks';
import { props } from './types';
import styles from './note.module.scss';

const Note = ({ content }: props) => {
  const { fullname } = useUser();

  const formatedFullname = Object.values(fullname).join(' ');

  return (
    <div className={styles.note}>
      <div>
        <ImageUser extraStyle={{ size: '45px', fontSize: '12px' }} />
      </div>
      <div>
        <p className={styles.author}>{formatedFullname}</p>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
};

export default Note;
