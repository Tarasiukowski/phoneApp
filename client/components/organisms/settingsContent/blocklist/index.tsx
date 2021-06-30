import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ElementFinder } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';
import ElementList from './elementList';

import { ErrorContext } from '../../../../contexts';
import {
  selectBlocklist,
  remove as removeFromBlcokList,
} from '../../../../reducers/blocklistReducer';
import { fetcher, handleNotAllowedError } from '../../../../utils';

const SettingsBlocklistContent = () => {
  const blocklist = useSelector(selectBlocklist);

  const disptach = useDispatch();
  const { setError } = useContext(ErrorContext);

  const removeFromBlockList = async (email: string) => {
    try {
      fetcher('POST', '/user/unblock', { userEmail: email });

      disptach(removeFromBlcokList({ by: 'email', value: email }));
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
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
