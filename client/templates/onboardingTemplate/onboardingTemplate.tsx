import { useState } from 'react';
import Alert from '../../components/atoms/alert/alert';
import { Button } from '../../components/atoms/button/button';
import Logo from '../../public/svgs/logo.svg';
import { Error } from '../../interfaces';
import styles from './onboardingTemplate.module.scss';
import { fetcher } from '../../utils';

const OnboardingTemplate: React.FC = ({ children }) => {
  const [error, setError] = useState<Error | null>();

  const logout = async () => {
    const { error, msg } = await fetcher('get', 'auth/logout');

    if (error) {
      setError({ msg: msg, id: Math.random() });
      return;
    }

    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <Button onClick={logout} absolute={{ right: '25px', top: '25px' }} transparent>
        Sign out
      </Button>
      {children}
      <Alert error={error ? error : null} />
    </div>
  );
};

export default OnboardingTemplate;
