import Image from 'next/image';

import styles from './loader.module.scss';

const Loader = () => {
  const imageStyle = { width: '70px', height: '70px' };

  return (
    <div className={styles.wrapper}>
      <Image src="/pngs/stamp.png" alt="stamp" {...imageStyle} />
    </div>
  );
};

export { Loader };
