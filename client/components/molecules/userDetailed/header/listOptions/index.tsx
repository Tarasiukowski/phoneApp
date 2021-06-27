import { props } from './types';
import { BlockSvg } from '../../../../../public/svgs';
import styles from './listOptions.module.scss';

const ListOptions = ({ open, listOptionsRef }: props) => (
  <div
    className={styles.box}
    ref={listOptionsRef}
    style={{ visibility: open ? 'visible' : 'hidden' }}
  >
    <div className={styles.elem}>
      <BlockSvg />
      <p>Block</p>
    </div>
  </div>
);

export default ListOptions;
