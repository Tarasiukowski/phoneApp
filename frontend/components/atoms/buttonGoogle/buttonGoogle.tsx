import LogoGoole from "../../../public/svgs/googleLogo.svg"
import { typeButtonGoogle } from "../../../interfaces"
import styles from './buttonGoogle.module.scss'

const ButtonGoogle = ({ login }: typeButtonGoogle) => (
  <button className={styles.button}>
    <LogoGoole />
    {login ? "Log in" : "Sing up"} with <span>Google</span>
  </button>
)

export default ButtonGoogle