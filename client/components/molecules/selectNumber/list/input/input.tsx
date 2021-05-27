import Digits from '../../../../../public/svgs/digits.svg';
import { propsSelectNumberInput } from '../../types';
import styles from './input.module.scss';

const Input = ({ value, onChange }: propsSelectNumberInput) => (
  <div className={styles.wrapper}>
    <Digits />
    <input
      value={value}
      onChange={onChange}
      type="number"
      placeholder="Filter by digits"
      autoComplete="off"
    />
  </div>
);

export default Input;
