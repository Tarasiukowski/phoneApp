import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import ImageUser from '../../../atoms/imageUser/imageUser';
import { Input } from '../../../atoms/input/input';
import { Button } from '../../../atoms/button/button';

import styles from './profile.module.scss';

const SettingsProfileContent = () => (
  <SettingsTemplate>
    <h2 className="title">Account</h2>
    <p className="description">Manage your OpenPhone profile.</p>
    <div className={styles.templateImage}>
      <ImageUser size="90%" fontSize="3rem" />
    </div>
    <div className={styles.templateInputs}>
      <Input name="firstname" value="Michał" placeholder="First name" autoComplete="off" />
      <Input name="lastname" value="Tarasiuk" placeholder="Last name" autoComplete="off" />
    </div>
    <p className={styles.label}>Email</p>
    <div className={styles.emailSet}>
      <p>michal.tarasiuk03@gmail.com</p>
      <Button width="auto" transparent>
        Change
      </Button>
    </div>
    <Button disabled={false} width="auto">
      save
    </Button>
  </SettingsTemplate>
);

export default SettingsProfileContent;
