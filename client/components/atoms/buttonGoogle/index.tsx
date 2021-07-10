import LogoGoole from '../../../public/svgs/googleLogo.svg';
import { props } from './types';
import { AuthType } from 'interfaces';
import styles from './buttonGoogle.module.scss';

const ButtonGoogle = ({ auth, onClick }: props) => {
  const isRegister = auth === AuthType.Singup;
  const content = isRegister ? 'Sing up' : 'Log in';

  return (
    <button onClick={onClick} className={styles.button}>
      <LogoGoole />
      {content} with <span>Google</span>
    </button>
  );
};

export { ButtonGoogle };
