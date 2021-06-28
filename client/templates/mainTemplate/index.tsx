import { useEffect } from 'react';
import useSwr from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { Navigation } from '../../components/molecules';

import { swrFetcher } from '../../utils';
import { selectInvites, update as updateInvites } from '../../reducers/invitesReducer';
import { selectFriends, update as updateFriends } from '../../reducers/friendsReducer';
import { selectBlocklist, update as updateBlocklist } from '../../reducers/blocklistReducer';
import { login, selectUser } from '../../reducers/userReducer';
import { Template } from './styles';

const MainTemplate: React.FC = ({ children }) => {
  const friends = useSelector(selectFriends);
  const invites = useSelector(selectInvites);
  const blocklist = useSelector(selectBlocklist);
  const user = useSelector(selectUser);

  const disptach = useDispatch();

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

  useEffect(() => {
    if (!errorBlocklist && fetchedBlocklist && fetchedBlocklist.length !== blocklist.length) {
      disptach(updateBlocklist(fetchedBlocklist));
    }
  }, [fetchedBlocklist, errorBlocklist]);

  useEffect(() => {
    if (!errorFriends && fetchedFriends && fetchedFriends.length !== friends.length) {
      disptach(updateFriends(fetchedFriends));
    }
  }, [fetchedFriends, errorFriends]);

  useEffect(() => {
    if (!errorInvites && fetchedInvites && fetchedInvites.length !== invites.length) {
      disptach(updateInvites(fetchedInvites));
    }
  }, [fetchedInvites, errorInvites]);

  useEffect(() => {
    if (!errorUser && fetchedUserData && fetchedUserData.user) {
      const fetchedUser = fetchedUserData.user.value;

      if (!_.isEqual(fetchedUser, user)) {
        disptach(login(fetchedUser));
      }
    }
  }, [fetchedUserData, errorUser]);

  return (
    <Template>
      <Navigation />
      {children}
    </Template>
  );
};

export { MainTemplate };
