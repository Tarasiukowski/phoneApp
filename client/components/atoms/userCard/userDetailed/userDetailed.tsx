import { RefObject } from 'react';
import ButtonNavigation from '../../buttonNavigation/buttonNavigation';
import UserCard from '../userCard';
import styles from './UserDetailed.module.scss';
import { SingOutSvg, SettingsSvg, PlusSvg } from "../../../../public/svgs"

const UserDetailed = ({ ref }: { ref: RefObject<HTMLDivElement> }) => (
  <div className={styles.box} ref={ref}>
    <div>
      <UserCard big />
    </div>
    <div className={styles.template}>
      <ButtonNavigation
        icon={<SettingsSvg />}
        content="Edit account"
      />
      <ButtonNavigation
        icon={<SettingsSvg />}
        content="Workspace settings"
      />
      <ButtonNavigation
        icon={<PlusSvg />}
        content="Invite your friends"
      />
      <ButtonNavigation
        icon={<SingOutSvg />}
        content="Sing out"
      />
    </div>
  </div>
);

export default UserDetailed;
