import { useState } from 'react';
import axios from 'axios';
import Alert from '../../components/atoms/alert/alert';
import { Button } from '../../components/atoms/button/button';
import Logo from '../../public/svgs/logo.svg';
import { Error } from '../../interfaces';
import styles from './onboardingTemplate.module.scss';

const OnboardingTemplate: React.FC = ({ children }) => {
  const [error, setError] = useState<Error | null>();

  const logout = async () => {
    const { data } = await axios.get('http://localhost:7000/auth/logout', {
      withCredentials: true,
    });

    if (data.error) {
      setError({ msg: data.msg, id: Math.random() });
      return;
    }

    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      <Logo className={styles.logo} />
      <Button onClick={logout} absolute={{ right: '25px', top: '15px' }} transparent>
        Sign out
      </Button>
      {children}
      <Alert errorMsg={error ? error.msg : null} />
    </div>
  );
};

export default OnboardingTemplate;
