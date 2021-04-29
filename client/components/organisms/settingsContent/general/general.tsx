import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import ImageUser from '../../../atoms/imageUser/imageUser';
import { Input } from '../../../atoms/input/input';
import { Button } from '../../../atoms/button/button';
import styles from './general.module.scss';

const SettingsGeneralContent = () => (
  <SettingsTemplate>
    <h2 className="title">Workspace</h2>
    <p className="description">General information about your workspace.</p>
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
  </SettingsTemplate>
);

export default SettingsGeneralContent;
