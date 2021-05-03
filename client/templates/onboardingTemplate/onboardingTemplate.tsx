import { useState } from 'react';
import Alert from '../../components/atoms/alert/alert';
import { Button } from '../../components/atoms/button/button';
import Logo from '../../public/svgs/logo.svg';
import { Error } from '../../interfaces';
import styles from './onboardingTemplate.module.scss';
import { logout } from '../../utils';

const OnboardingTemplate: React.FC = ({ children }) => {
  const [error, setError] = useState<Error | null>();

  const hanldeLogoutError = (msg: string) => {
    setError({ msg, id: Math.random() });
  };

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <Button
        onClick={() => logout(hanldeLogoutError)}
        absolute={{ right: '25px', top: '25px' }}
        transparent
      >
        Sign out
      </Button>
      {children}
      <Alert error={error ? error : null} />
    </div>
  );
};

export default OnboardingTemplate;
