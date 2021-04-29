import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import { Button } from '../../../atoms/button/button';
import UserCard from '../../../atoms/userCard/userCard';
import ElementFinder from '../../../molecules/elementFinder/elementFinder';
import styles from './friends.module.scss';

const SettingsFriendsContent = () => (
  <SettingsTemplate>
    <h2 className="title">Friends</h2>
    <p className="description">Manage all the members in your friend list.</p>
    <Button margin="37px 0 17px 0" width="auto">
      Invite a member
    </Button>
    <ElementFinder>
      <div className={styles.elementList}>
        <UserCard big />
        <Button width="auto">Remove</Button>
      </div>
    </ElementFinder>
  </SettingsTemplate>
);

export default SettingsFriendsContent;
