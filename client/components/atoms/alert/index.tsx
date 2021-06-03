import { useEffect, useState } from 'react';

import { Button } from '../button';

import { props } from './types';
import styles from './alert.module.scss';

const Alert = ({ error }: props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const { msg } = error;

      if (msg.length - 49 > 20) {
        const sliceMsg = msg.substring(0, 67) + '...';

        setMsg(sliceMsg);
      } else {
        setMsg(msg);
      }
    }
    setIsOpen(true);
  }, [error]);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      {error && isOpen ? (
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

export { Alert };
