import { Button } from '../button/button'
import styles from './alert.module.scss'

const Alert = () => (
  <div className={styles.wrapper}>
    <p>some alert</p>
    <Button transparent>Close</Button>
  </div>
)

export default Alert