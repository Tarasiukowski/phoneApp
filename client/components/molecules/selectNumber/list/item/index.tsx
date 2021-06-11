import Circle from '../../../../../public/svgs/circle.svg'
import { propsSelectNumberItem } from '../../types'
import styles from './item.module.scss'

const Item = ({ number, onClick }: propsSelectNumberItem) => (
  <div onClick={onClick} className={styles.wrapper}>
    <Circle />
    <p>{number}</p>
  </div>
)

export default Item