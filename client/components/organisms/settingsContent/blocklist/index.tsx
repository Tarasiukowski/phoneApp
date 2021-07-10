import { useDispatch } from 'react-redux';

import { ElementFinder } from 'components/molecules';
import { SettingsTemplate } from 'templates';
import ElementList from './elementList';

import { useError } from 'contexts';
import { remove as removeFromBlcokList } from 'setup/reducers/blocklistReducer';
import { fetcher, handleRequestError } from 'utils';
import { useBlocklist } from 'hooks';

const SettingsBlocklistContent = () => {
  const disptach = useDispatch();

  const blocklist = useBlocklist();
  const { setError } = useError();

  const removeFromBlockList = async (email: string) => {
    try {
      fetcher('POST', '/user/unblock', { userEmail: email });

      disptach(removeFromBlcokList({ by: 'email', value: email }));
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  };

  return (
    <SettingsTemplate>
      <h2 className="title">Blocklist</h2>
      <p className="description">Your list of blocked phone numbers.</p>
      <ElementFinder
        data={blocklist}
        filterKey="fullname"
        placeholder="Search for a number"
        notFound="No one's blocked, woohoo 🌞"
        renderItem={(user) => (
          <ElementList user={user} onClick={() => removeFromBlockList(user.email)} />
        )}
      />
    </SettingsTemplate>
  );
};

export { SettingsBlocklistContent };
