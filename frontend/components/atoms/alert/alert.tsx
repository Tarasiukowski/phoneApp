import { Button } from '../button/button'
import { propsAlert } from '../../../interfaces'
import styles from './alert.module.scss'

const Alert = ({ errorMessage, close }: propsAlert) => (
  <div className={styles.wrapper}>
    <p>{errorMessage}</p>
    <Button onClick={close} transparent>Close</Button>
  </div>
)

export default Alert