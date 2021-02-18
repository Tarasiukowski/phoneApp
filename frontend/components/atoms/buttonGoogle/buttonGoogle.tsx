import LogoGoole from "../../../public/svgs/googleLogo.svg"
import { propsButtonGoogle } from "../../../interfaces"
import styles from './buttonGoogle.module.scss'

const ButtonGoogle = ({ login, onClick }: propsButtonGoogle) => (
  <button onClick={onClick} className={styles.button}>
    <LogoGoole />
    {login ? "Log in" : "Sing up"} with <span>Google</span>
  </button>
)

export default ButtonGoogle