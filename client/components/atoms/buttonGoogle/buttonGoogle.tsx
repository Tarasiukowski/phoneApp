import LogoGoole from '../../../public/svgs/googleLogo.svg';
import { props } from './types';
import styles from './buttonGoogle.module.scss';

const ButtonGoogle = ({ auth, onClick }: props) => (
  <button onClick={onClick} className={styles.button}>
    <LogoGoole />
    {auth === 'login' ? 'Log in' : 'Sing up'} with <span>Google</span>
  </button>
);

export default ButtonGoogle;
