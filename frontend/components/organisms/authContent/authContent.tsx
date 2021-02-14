import ButtonGoogle from "../../atoms/buttonGoogle/buttonGoogle"
import AuthForm from "../../molecules/authForm/authForm"
import ToggleAuth from "../../atoms/toggleAauth/toggleAuth"
import styles from './authContent.module.scss'
import { typeAuthContent } from '../../../interfaces'

const AuthContent = ({ login }: typeAuthContent) => (
  <div className={styles.card}>
    <h4>{login ? "Log into OpenPhone" : "Sign up on OpenPhone"}</h4>
    <h6>Use one of the methods below to continue</h6>
    <ButtonGoogle login={login} />
    <p>Or continue with email</p>
    <AuthForm  login={login} />
    <ToggleAuth login={login} />
  </div>
)

export default AuthContent