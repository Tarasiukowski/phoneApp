import Link from 'next/link';

import { props } from './types';
import styles from './ToggleAuth.module.scss';

const ToggleAuth = ({ auth }: props) => {
  const isLogin = auth === 'login' ? true : false;

  return (
    <div className={styles.wrapper}>
      <p>
        {isLogin ? 'Need an account?' : 'Already have an account?'}
        <Link href={isLogin ? '/singup' : '/login'}>{isLogin ? 'Sing up.' : 'Login.'}</Link>
      </p>
    </div>
  );
};

export default ToggleAuth;
