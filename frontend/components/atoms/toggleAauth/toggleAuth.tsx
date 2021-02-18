import Link from 'next/link';
import { propsToggleAuth } from "../../../interfaces"
import styles from './ToggleAuth.module.scss'

const ToggleAuth = ({ login }: propsToggleAuth) => (
  <div className={styles.wrapper}>
    <p>
      {login ? "Need an account?" : "Already have an account?"}
      <Link href={login ? "/singup" : "/login"}>{login ? "Sing up." : "Login."}</Link>
    </p>
  </div>
);

export default ToggleAuth;
