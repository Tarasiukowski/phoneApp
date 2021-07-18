import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Button } from 'components/atoms';

import { update as updateBlocklist } from 'setup/reducers/blocklistReducer';
import { update as updateFriends } from 'setup/reducers/friendsReducer';
import { update as updateInvites } from 'setup/reducers/invitesReducer';
import Logo from '../../public/svgs/logo.svg';
import { logout } from 'utils';
import styles from './onboardingTemplate.module.scss';
import { useLoading } from 'contexts/loadingContext';
import { paths } from '../../constants';

const OnboardingTemplate: React.FC = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { toggleLoading } = useLoading();

  const resetData = () => {
    dispatch(updateInvites([]));
    dispatch(updateBlocklist([]));
    dispatch(updateFriends([]));
  };

  const handleOnRequestLogout = () => {
    toggleLoading(true);
  };

  const handleOnResponseLogout = () => {
    router.push(paths.singUp).then(() => {
      toggleLoading(false);
      resetData();
    });
  };

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <Button
        onClick={() => logout(handleOnRequestLogout, handleOnResponseLogout)}
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
