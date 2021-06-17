import { TextArea } from '../../../atoms';
import Note from './note';

import { props } from '../notes/types';
import styles from './notes.module.scss';

const Notes = ({ data }: props) => (
  <div className={styles.template}>
    <p className={styles.heading}>Notes: {data.length}</p>
    <div className={styles.notes}>
      {data.map(({ content }) => (
        <Note content={content} />
      ))}
    </div>
    <TextArea placeholder="Write a note..." />
  </div>
);

export default Notes;
