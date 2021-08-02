import { useCallback, forwardRef } from 'react';
import { useDispatch } from 'react-redux';

import { remove as removeFriend } from 'setup/reducers/friendsReducer';
import { remove as removeInvite } from 'setup/reducers/invitesReducer';
import { props } from './types';
import { BlockSvg } from '../../../../../public/svgs';
import { blockUser, handleRequestError } from 'utils';
import { useFriends } from 'setup/reducers/friendsReducer';
import { useError } from 'contexts';
import styles from './listOptions.module.scss';

const ListOptions = forwardRef<HTMLDivElement, props>(({ open, email }, ref) => {
  const dispatch = useDispatch();
  const friends = useFriends();
  const { setError } = useError();

  const handleBlockUser = useCallback(async () => {
    try {
      const memberEmail = email as string;
      const isFriend = friends.find((friend) => friend.email === email);

      await blockUser(memberEmail);

      isFriend
        ? dispatch(removeFriend({ by: 'email', value: memberEmail }))
        : dispatch(removeInvite({ by: 'email', value: memberEmail }));
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, []);

  return (
    <div className={styles.box} style={{ visibility: open ? 'visible' : 'hidden' }} ref={ref}>
      <div onClick={handleBlockUser} className={styles.elem}>
        <BlockSvg />
        <p>Block</p>
      </div>
    </div>
  );
});

export default ListOptions;
