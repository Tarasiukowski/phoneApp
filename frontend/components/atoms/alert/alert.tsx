import { useEffect, useState } from 'react';
import { Button } from '../button/button';
import { propsAlert } from '../../../interfaces';
import styles from './alert.module.scss';

const Alert = ({ errorMsg }: propsAlert) => {
  const [isOpen, setIsOpen] = useState<boolean>(Boolean);

  useEffect(() => {
    setIsOpen(true);
  }, [errorMsg]);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      {errorMsg && isOpen ? (
        <div className={styles.wrapper}>
          <p>{errorMsg}</p>
          <Button onClick={close} transparent>
            Close
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
