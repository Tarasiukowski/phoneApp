import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';

import { TextArea } from '../../../atoms';
import Note from './note';

import { props } from '../notes/types';
import styles from './notes.module.scss';
import { updateOne } from '../../../../reducers/friendsReducer';

const Notes = ({ data, email }: props) => {
  const [valueTextArea, setValueTextArea] = useState('');

  const dispatch = useDispatch();

  const handleOnchange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;

    setValueTextArea(target.value);
  };

  const createNote = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && valueTextArea.trim().length > 0) {
      dispatch(updateOne({ email, key: 'notes', data: { content: valueTextArea } }));
      setValueTextArea('');
    }
  };

  return (
    <div className={styles.template}>
      <p className={styles.heading}>Notes: {data.length}</p>
      <div className={styles.notes}>
        {data.map(({ content }) => (
          <Note content={content} key={content} />
        ))}
      </div>
      <TextArea
        value={valueTextArea}
        placeholder="Write a note..."
        onChange={handleOnchange}
        onKeyDown={createNote}
      />
    </div>
  );
};

export default Notes;
