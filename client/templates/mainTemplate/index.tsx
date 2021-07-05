import useSwr from 'swr';
import { useDispatch, useSelector } from 'react-redux';

import { Navigation } from 'components/molecules';

import { useBlocklist, useInvites, useListUpdate, useUpdateUser, useUser } from 'hooks';
import { swrFetcher } from 'utils';
import { update as updateInvites } from 'reducers/invitesReducer';
import { selectFriends, update as updateFriends } from 'reducers/friendsReducer';
import { update as updateBlocklist } from 'reducers/blocklistReducer';
import { login } from 'reducers/userReducer';
import { Template } from './styles';

const MainTemplate: React.FC = ({ children }) => {
  const disptach = useDispatch();

  const friends = useSelector(selectFriends);
  const invites = useInvites();
  const blocklist = useBlocklist();
  const user = useUser();

  const { data: fetchedFriends, error: errorFriends } = useSwr(
    ['/user/friends', 'POST'],
    swrFetcher,
    {
      refreshInterval: 1,
    },
  );

  const { data: fetchedInvites, error: errorInvites } = useSwr(
    ['/user/invite/get', 'POST'],
    swrFetcher,
    {
      refreshInterval: 1,
    },
  );

  const { data: fetchedBlocklist, error: errorBlocklist } = useSwr(
    ['/user/block/get', 'POST'],
    swrFetcher,
    {
      refreshInterval: 1,
    },
  );

  const { data: fetchedUserData, error: errorUser } = useSwr(['/auth', 'POST'], swrFetcher, {
    refreshInterval: 1,
  });

  useListUpdate(errorBlocklist, fetchedBlocklist, blocklist, () => {
    disptach(updateBlocklist(fetchedBlocklist));
  });

  useListUpdate(errorFriends, fetchedFriends, friends, () => {
    disptach(updateFriends(fetchedFriends));
  });

  useListUpdate(errorInvites, fetchedInvites, invites, () => {
    disptach(updateInvites(fetchedInvites));
  });

  useUpdateUser(errorUser, fetchedUserData, user, (fetchedUser) => {
    disptach(login(fetchedUser));
  });

  return (
    <Template>
      <Navigation />
      {children}
    </Template>
  );
};

export { MainTemplate };
