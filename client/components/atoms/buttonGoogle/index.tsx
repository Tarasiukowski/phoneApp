import LogoGoole from '../../../public/svgs/googleLogo.svg';
import { props } from './types';
import styles from './buttonGoogle.module.scss';

const ButtonGoogle = ({ auth, onClick }: props) => {
  const isRegister = auth === 'singup';

  return (
    <button onClick={onClick} className={styles.button}>
      <LogoGoole />
      {isRegister ? 'Sing up' : 'Log in'} with <span>Google</span>
    </button>
  );
};

export { ButtonGoogle };
