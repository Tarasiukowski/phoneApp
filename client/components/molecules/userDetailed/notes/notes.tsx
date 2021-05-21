import ImageUser from '../../../atoms/imageUser/imageUser';
import { TextArea } from '../../../atoms/textArea/textArea';

import styles from './notes.module.scss';

const Notes = () => {
  return (
    <div className={styles.template}>
      <p className={styles.heading}>Notes: 1</p>
      <div className={styles.notes}>
        <div className={styles.note}>
          <div>
            <ImageUser size="45px" />
          </div>
          <div>
            <p className={styles.author}>Michał Tarasiuk</p>
            <p className={styles.content}>
              Something...
            </p>
          </div>
        </div>
      </div>
      <TextArea placeholder="Write a note..." />
    </div>
  );
};

export default Notes;
