import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { remove as removeFriend } from '../../../../../reducers/friendsReducer';
import { props } from './types';
import { BlockSvg } from '../../../../../public/svgs';
import { fetcher, handleNotAllowedError } from '../../../../../utils';
import { ErrorContext } from '../../../../../contexts';
import styles from './listOptions.module.scss';

const ListOptions = ({ open, email, listOptionsRef }: props) => {
  const dispatch = useDispatch();

  const { setError } = useContext(ErrorContext);

  const blockUser = async () => {
    try {
      const userEmail = email as string;

      dispatch(removeFriend({ by: 'email', value: userEmail }));

      await fetcher('POST', '/user/block', {
        userEmail,
      });
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
    }
  };

  return (
    <div
      className={styles.box}
      ref={listOptionsRef}
      style={{ visibility: open ? 'visible' : 'hidden' }}
    >
      <div onClick={blockUser} className={styles.elem}>
        <BlockSvg />
        <p>Block</p>
      </div>
    </div>
  );
};

export default ListOptions;
