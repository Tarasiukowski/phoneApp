import PenSvg from '../../../../public/svgs/pen.svg';
import { props } from './types';
import styles from './button.module.scss';

const SelectNumberButton = ({ onClick, number, mini }: props) => {
  const isLoading = !number;

  return (
    <div
      onClick={onClick}
      className={styles.wrapper}
      style={mini ? { width: '40%', height: '60px' } : undefined}
    >
      {isLoading ? (
        <div className={styles.loaderNumber} />
      ) : (
        <>
          <p style={mini ? { fontSize: '20px' } : undefined}>{number}</p>
          <PenSvg />
        </>
      )}
    </div>
  );
};

export { SelectNumberButton };
