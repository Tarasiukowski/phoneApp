import { ChangeEvent, useState, KeyboardEvent, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { TextArea } from 'components/atoms';
import Note from './note';

import { props } from '../notes/types';
import { updateOne } from 'setup/reducers/friendsReducer';
import styles from './notes.module.scss';

const Notes = ({ data, email }: props) => {
  const [valueTextArea, setValueTextArea] = useState('');

  const dispatch = useDispatch();

  const textAreaHandle = useMemo(
    () => ({
      onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;

        setValueTextArea(target.value);
      },
      onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && valueTextArea.trim().length > 0) {
          dispatch(updateOne({ email, key: 'notes', value: { content: valueTextArea } }));
          setValueTextArea('');
        }
      },
    }),
    [valueTextArea],
  );

  return (
    <div className={styles.template}>
      <p className={styles.heading}>Notes: {data.length}</p>
      <div className={styles.notes}>
        {data.map(({ content }) => (
          <Note content={content} key={content} />
        ))}
      </div>
      <TextArea value={valueTextArea} placeholder="Write a note..." {...textAreaHandle} />
    </div>
  );
};

export default Notes;
