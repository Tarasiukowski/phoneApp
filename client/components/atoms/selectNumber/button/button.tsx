import styles from './button.module.scss';
import PenSvg from '../../../../public/svgs/pen.svg';
import { propsSelectNumberButton } from '../types';

const SelectNumberButton = ({ onClick, number }: propsSelectNumberButton) => {
  return (
    <div onClick={onClick} className={styles.wrapper}>
      {number ? (
        <>
          <p>{number}</p>
          <PenSvg />
        </>
      ) : (
        <div className={styles.loaderNumber} />
      )}
    </div>
  );
};

export default SelectNumberButton;
