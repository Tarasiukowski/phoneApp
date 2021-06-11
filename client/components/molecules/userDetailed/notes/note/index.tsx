import { ImageUser } from '../../../../atoms';

import styles from './note.module.scss';

const Note = () => (
  <div className={styles.note}>
    <div>
      <ImageUser size="45px" fontSize="12px" />
    </div>
    <div>
      <p className={styles.author}>Michał Tarasiuk</p>
      <p className={styles.content}>Something...</p>
    </div>
  </div>
);

export default Note;
