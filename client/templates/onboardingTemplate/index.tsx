import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Button } from 'components/atoms';

import { update as updateBlocklist } from '../../reducers/blocklistReducer';
import { update as updateFriends } from '../../reducers/friendsReducer';
import { update as updateInvites } from '../../reducers/invitesReducer';
import Logo from '../../public/svgs/logo.svg';
import { logout } from 'utils';
import styles from './onboardingTemplate.module.scss';

const OnboardingTemplate: React.FC = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const resetData = () => {
    dispatch(updateInvites([]));
    dispatch(updateBlocklist([]));
    dispatch(updateFriends([]));
  };

  const logoutCb = () => {
    router.push('/singup').then(() => {
      resetData();
    });
  };

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <Button
        onClick={() => logout(logoutCb)}
        style={{ position: 'absolute', right: '25px', top: '25px' }}
        width="auto"
        transparent
      >
        Sign out
      </Button>
      {children}
    </div>
  );
};

export { OnboardingTemplate };
