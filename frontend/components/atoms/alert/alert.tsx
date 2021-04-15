import { useEffect, useState } from 'react';
import { Button } from '../button/button';
import { propsAlert } from '../../../interfaces';
import styles from './alert.module.scss';

const Alert = ({ errorMsg }: propsAlert) => {
  const [isOpen, setIsOpen] = useState<boolean>(Boolean);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (errorMsg) {
      if (errorMsg.length - 49 > 20) {
        const sliceMsg = errorMsg.substring(0, 67) + '...';

        setMsg(sliceMsg);
      } else {
        setMsg(errorMsg);
      }
    }
    setIsOpen(true);
  }, [errorMsg]);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      {errorMsg && isOpen ? (
        <div className={styles.wrapper}>
          <p>{msg}</p>
          <Button onClick={close} transparent alert>
            Close
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
