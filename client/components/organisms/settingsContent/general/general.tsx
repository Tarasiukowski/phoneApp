import { ImageUser, Input, Button } from '../../../atoms';
import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';

import styles from './general.module.scss';

export const SettingsGeneralContent = () => (
  <SettingsTemplate>
    <h2 className="title">Workspace</h2>
    <p className="description">General information about your workspace.</p>
    <div className={styles.templateImage}>
      <ImageUser size="90%" fontSize="3rem" />
    </div>
    <div className={styles.templateInput}>
      <p className={styles.label}>Company name</p>
      <Input autoComplete="off" />
    </div>
    <Button disabled={true} width="auto">
      save
    </Button>
  </SettingsTemplate>
);

export default SettingsGeneralContent;
