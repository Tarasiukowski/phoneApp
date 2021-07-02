import { useDispatch } from 'react-redux';

import { remove as removeFriend } from '../../../../../reducers/friendsReducer';
import { remove as removeInvite } from '../../../../../reducers/invitesReducer';
import { props } from './types';
import { BlockSvg } from '../../../../../public/svgs';
import { fetcher, handleNotAllowedError } from '../../../../../utils';
import { useFriends } from '../../../../../hooks';
import { useError } from '../../../../../contexts';
import styles from './listOptions.module.scss';

const ListOptions = ({ open, email, listOptionsRef }: props) => {
  const dispatch = useDispatch();
  const friends = useFriends();
  const { setError } = useError();

  const blockUser = async () => {
    try {
      const userEmail = email as string;
      const isFriend = friends.find((friend) => friend.email === email);

      isFriend
        ? dispatch(removeFriend({ by: 'email', value: userEmail }))
        : dispatch(removeInvite({ by: 'email', value: userEmail }));

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
