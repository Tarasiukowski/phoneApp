import Link from 'next/link';

import { props } from './types';
import styles from './ToggleAuth.module.scss';

const ToggleAuth = ({ auth }: props) => {
  const isRegister = auth === 'singup';

  return (
    <div className={styles.wrapper}>
      <p>
        {isRegister ? 'Already have an account?' : 'Need an account?'}
        <Link href={isRegister ? '/login' : '/singup'}>{isRegister ? 'Login.' : 'Sing up.'}</Link>
      </p>
    </div>
  );
};

export { ToggleAuth };
