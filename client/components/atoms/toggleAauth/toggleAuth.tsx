import Link from 'next/link';

import { props } from './types';
import styles from './ToggleAuth.module.scss';

const ToggleAuth = ({ login }: props) => (
  <div className={styles.wrapper}>
    <p>
      {login ? 'Need an account?' : 'Already have an account?'}
      <Link href={login ? '/singup' : '/login'}>{login ? 'Sing up.' : 'Login.'}</Link>
    </p>
  </div>
);

export default ToggleAuth;
