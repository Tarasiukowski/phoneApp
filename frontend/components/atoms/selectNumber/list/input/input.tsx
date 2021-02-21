import Digits from '../../../../../public/svgs/digits.svg'
import styles from './input.module.scss'

const Input = () => (
  <div className={styles.wrapper}>
    <Digits />
    <input placeholder="Filter by digits" />
  </div>
)

export default Input