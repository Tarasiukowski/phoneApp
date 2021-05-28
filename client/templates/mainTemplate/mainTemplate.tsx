import { useEffect } from 'react';
import useSwr from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import Navigation from '../../components/molecules/navigation/navigation';

import { swrFetcher } from '../../utils';
import { login, selectUser } from '../../reducers/userReducer';
import { selectInvites, update as updateInvites } from '../../reducers/invitesReducer';
import { selectFriends, update as updateFriends } from '../../reducers/friendsReducer';

const MainTemplate: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);
  const invites = useSelector(selectInvites);

  const disptach = useDispatch();

  const { data: fetchedFriends, error: errorF } = useSwr(
    ['/user/friends', 'POST', user.email],
    swrFetcher,
    {
      refreshInterval: 1,
    },
  );
  const { data: fetchedInvites, error: errorI } = useSwr(
    ['/user/invite/get', 'POST', user.email],
    swrFetcher,
    {
      refreshInterval: 1,
    },
  );
  const { data: fetchedUser, error: errorU } = useSwr(['/auth', 'POST'], swrFetcher, {
    refreshInterval: 1,
  });

  useEffect(() => {
    if (!errorF && fetchedFriends && fetchedFriends.length !== friends.length) {
      disptach(updateFriends(fetchedFriends));
    }
  }, [fetchedFriends, errorF]);

  useEffect(() => {
    if (!errorI && fetchedInvites && fetchedInvites.length !== invites.length) {
      disptach(updateInvites(fetchedInvites));
    }
  }, [fetchedInvites, errorI]);

  useEffect(() => {
    if (!errorU && fetchedUser) {
      if (!_.isEqual(fetchedUser.user, user)) {
        const { user } = fetchedUser;

        disptach(login(user));
      }
    }
  }, [fetchedUser, errorU]);

  return (
    <Template>
      <Navigation />
      {children}
    </Template>
  );
};

const Template = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export default MainTemplate;
