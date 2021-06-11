import { TextArea } from '../../../atoms';
import Note from './note';

import styles from './notes.module.scss';

const Notes = () => {
  return (
    <div className={styles.template}>
      <p className={styles.heading}>Notes: 1</p>
      <div className={styles.notes}>
        <Note />
      </div>
      <TextArea placeholder="Write a note..." />
    </div>
  );
};

export default Notes;
