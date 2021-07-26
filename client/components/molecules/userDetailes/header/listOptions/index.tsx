import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { remove as removeFriend } from 'setup/reducers/friendsReducer';
import { remove as removeInvite } from 'setup/reducers/invitesReducer';
import { props } from './types';
import { BlockSvg } from '../../../../../public/svgs';
import { fetcher, handleRequestError } from 'utils';
import { useFriends } from 'setup/reducers/friendsReducer';
import { useError } from 'contexts';
import styles from './listOptions.module.scss';

const ListOptions = ({ open, email, listOptionsRef }: props) => {
  const dispatch = useDispatch();
  const friends = useFriends();
  const { setError } = useError();

  const blockUser = useCallback(async () => {
    try {
      const userEmail = email as string;
      const isFriend = friends.find((friend) => friend.email === email);

      isFriend
        ? dispatch(removeFriend({ by: 'email', value: userEmail }))
        : dispatch(removeInvite({ by: 'email', value: userEmail }));

      await fetcher('POST', '/user/block', {
        blockedUserEmail: userEmail,
      });
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, []);

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
