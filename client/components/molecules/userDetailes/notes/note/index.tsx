import { ImageUser } from 'components/atoms';

import { useUser } from 'setup/reducers/userReducer';
import { props } from './types';
import { formatValuesObject } from 'utils';
import styles from './note.module.scss';

const Note = ({ content }: props) => {
  const user = useUser();

  if (user) {
    const { fullname } = user;

    const formatedFullname = formatValuesObject(fullname);

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
  }

  return null;
};

export default Note;
