import SpinnerSvg from '../../../public/svgs/spinner.svg';
import styles from './spinner.module.scss';

const Spinner = () => (
  <div className={styles.content}>
    <div className={styles.spinner}>
      <SpinnerSvg />
    </div>
  </div>
);

export { Spinner };
