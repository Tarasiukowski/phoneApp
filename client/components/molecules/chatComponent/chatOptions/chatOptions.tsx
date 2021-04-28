import styles from './chatOptions.module.scss';
import { MoreSvg, UnreadSvg } from '../../../../public/svgs';
import { Button } from '../../../atoms/button/button';

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
