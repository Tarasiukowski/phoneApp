import { useState } from 'react';

import Alert from '../../components/atoms/alert/alert';
import { Button } from '../../components/atoms/button/button';

import Logo from '../../public/svgs/logo.svg';
import { logout } from '../../utils';
import { Error } from '../../interfaces';
import styles from './onboardingTemplate.module.scss';

const OnboardingTemplate: React.FC = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const hanldeLogoutError = (msg: string) => {
    setError({ msg, id: Math.random() });
  };

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <Button
        onClick={() => logout(hanldeLogoutError)}
        style={{ position: 'absolute', right: '25px', top: '25px' }}
        transparent
      >
        Sign out
      </Button>
      {children}
      <Alert error={error} />
    </div>
  );
};

export default OnboardingTemplate;
