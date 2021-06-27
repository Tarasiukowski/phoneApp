import { useSelector } from 'react-redux';

import { ElementFinder } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';
import ElementList from './elementList';

import { selectBlocklist } from '../../../../reducers/blocklistReducer';

const SettingsBlocklistContent = () => {
  const blocklist = useSelector(selectBlocklist);

  return (
    <SettingsTemplate>
      <h2 className="title">Blocklist</h2>
      <p className="description">Your list of blocked phone numbers.</p>
      <ElementFinder
        data={blocklist}
        filterKey="fullname"
        placeholder="Search for a number"
        notFound="No one's blocked, woohoo 🌞"
        renderItem={(user) => <ElementList user={user} onClick={async () => {}} />}
      />
    </SettingsTemplate>
  );
};

export { SettingsBlocklistContent };
