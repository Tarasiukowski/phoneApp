import LogoGoole from '../../../public/svgs/googleLogo.svg';
import { props } from './types';
import { AuthType } from 'interfaces';
import styles from './buttonGoogle.module.scss';

const ButtonGoogle = ({ auth, ...restProps }: props) => {
  const isRegister = auth === AuthType.Singup;
  const content = isRegister ? 'Sing up' : 'Log in';

  return (
    <button className={styles.button} {...restProps} >
      <LogoGoole />
      {content} with <span>Google</span>
    </button>
  );
};

export { ButtonGoogle };
