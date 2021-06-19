import Digits from '../../../../../public/svgs/digits.svg';
import { props } from './types';
import styles from './input.module.scss';

const Input = ({ value, onChange }: props) => (
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
