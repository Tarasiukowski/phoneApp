import { Button } from '../../../atoms';

import styles from './chatOptions.module.scss';
import { MoreSvg, UnreadSvg } from '../../../../public/svgs';

const ChatOptions = () => (
  <div className={styles.box}>
    <Button width="auto">
      <UnreadSvg />
    </Button>
    <Button width="auto">
      <MoreSvg />
    </Button>
  </div>
);

export default ChatOptions;
