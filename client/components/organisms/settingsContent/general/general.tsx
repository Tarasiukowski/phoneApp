// import ImageUser from '../../../atoms/imageUser/imageUser';
import { Button } from '../../../atoms/button/button';
import ImageUser from '../../../atoms/imageUser/imageUser';
import { Input } from '../../../atoms/input/input';
import styles from './general.module.scss';

const SettingsGeneralContent = () => (
  <div className={styles.template}>
    <h2 className={styles.title}>Workspace</h2>
    <p className={styles.description}>General information about your workspace.</p>
    <div className={styles.templateImage}>
      <ImageUser customized />
    </div>
    <div className={styles.templateInput}>
      <p className={styles.label}>Company name</p>
      <Input />
    </div>
    <Button disabled={true} width="auto">
      save
    </Button>
  </div>
);

export default SettingsGeneralContent;
