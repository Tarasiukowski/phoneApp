import Link from 'next/link';

import { props } from './types';
import styles from './ToggleAuth.module.scss';
import { AuthType } from 'interfaces';
import { paths } from '../../../constants';

const ToggleAuth = ({ auth }: props) => {
  const isRegister = auth === AuthType.Singup;
  const content = isRegister ? 'Already have an account?' : 'Need an account?';
  const handleLink = {
    content: isRegister ? 'Login.' : 'Sing up.',
    href: isRegister ? paths.Login.Index : paths.SingUp,
  };

  return (
    <div className={styles.wrapper}>
      <p>
        {content}
        <Link href={handleLink.href}>{handleLink.content}</Link>
      </p>
    </div>
  );
};

export { ToggleAuth };
