import { useState } from 'react';
import styles from './button.module.scss';
import PenSvg from '../../../../public/svgs/pen.svg';
import { propsSelectNumberButton } from '../../../../interfaces';

const SelectNumberButton = ({ onClick }: propsSelectNumberButton) => {
  const [number, setNumber] = useState<string | null>(null);

  return (
    <div onClick={onClick} className={styles.wrapper}>
      {number ? (
        <>
          <p>876-8765</p>
          <PenSvg />
        </>
      ) : (
        <div className={styles.loaderNumber} />
      )}
    </div>
  );
};

export default SelectNumberButton;
