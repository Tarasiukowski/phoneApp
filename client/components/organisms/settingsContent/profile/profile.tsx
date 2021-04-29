// import ImageUser from '../../../atoms/imageUser/imageUser';
import { Button } from '../../../atoms/button/button';
import ImageUser from '../../../atoms/imageUser/imageUser';
import { Input } from '../../../atoms/input/input';
import styles from './profile.module.scss';

const SettingsProfileContent = () => (
  <div className={styles.template}>
    <h2 className={styles.title}>Account</h2>
    <p className={styles.description}>Manage your OpenPhone profile.</p>
    <div className={styles.templateImage}>
      <ImageUser customized />
    </div>
    <div className={styles.templateInputs}>
      <Input name="firstname" value="Michał" placeholder="First name" />
      <Input name="lastname" value="Tarasiuk" placeholder="Last name" />
    </div>
    <p className={styles.label}>Email</p>
    <div className={styles.emailSet}>
      <p>michal.tarasiuk03@gmail.com</p>
      <Button width="auto" transparent>Change</Button>
    </div>
    <Button disabled={false} width="auto">save</Button>
  </div>
);

export default SettingsProfileContent;
