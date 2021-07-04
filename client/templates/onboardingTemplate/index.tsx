import { useRouter } from 'next/router';

import { Button } from 'components/atoms';

import Logo from '../../public/svgs/logo.svg';
import { logout } from 'utils';
import styles from './onboardingTemplate.module.scss';

const OnboardingTemplate: React.FC = ({ children }) => {
  const router = useRouter();

  const logoutCb = () => {
    router.push('/singup');
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
