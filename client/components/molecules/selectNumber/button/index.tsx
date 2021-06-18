import styles from './button.module.scss';
import PenSvg from '../../../../public/svgs/pen.svg';
import { propsSelectNumberButton } from '../types';

const SelectNumberButton = ({ onClick, number, mini }: propsSelectNumberButton) => {
  return (
    <div
      onClick={onClick}
      className={styles.wrapper}
      style={mini ? { width: '40%', height: '60px' } : undefined}
    >
      {number ? (
        <>
          <p style={mini ? { fontSize: "20px" } : undefined}>{number}</p>
          <PenSvg />
        </>
      ) : (
        <div className={styles.loaderNumber} />
      )}
    </div>
  );
};

export { SelectNumberButton };
