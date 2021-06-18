import { useSelector } from 'react-redux';

import { ImageUser } from '../../../../atoms';

import { props } from './types';
import styles from './note.module.scss';
import { selectUser } from '../../../../../reducers/userReducer';

const Note = ({ content }: props) => {
  const {
    fullname: { firstname, lastname },
  } = useSelector(selectUser);

  return (
    <div className={styles.note}>
      <div>
        <ImageUser extraStyle={{ size: "45px", fontSize: "12px" }} />
      </div>
      <div>
        <p className={styles.author}>
          {firstname} {lastname}
        </p>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
};

export default Note;
