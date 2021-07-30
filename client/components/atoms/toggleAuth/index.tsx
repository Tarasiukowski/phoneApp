import Link from 'next/link';

import { props } from './types';
import styles from './ToggleAuth.module.scss';
import { AuthType } from 'interfaces';
import { paths } from '../../../constants';

const ToggleAuth = ({ authType }: props) => {
  const isRegister = authType === AuthType.Singup;
  const content = isRegister ? 'Already have an account?' : 'Need an account?';
  const handleLink = {
    content: isRegister ? 'Login.' : 'Sing up.',
    href: isRegister ? paths.login.index : paths.singUp,
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
