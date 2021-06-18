import { useEffect } from 'react';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { Navigation } from '../../components/molecules';

import { swrFetcher } from '../../utils';
import { login, selectUser } from '../../reducers/userReducer';
import { selectInvites, update as updateInvites } from '../../reducers/invitesReducer';
import { selectFriends, update as updateFriends } from '../../reducers/friendsReducer';
import { Template } from './styles';

const MainTemplate: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);
  const invites = useSelector(selectInvites);

  const disptach = useDispatch();
  const router = useRouter();

  const { data: fetchedFriends, error: errorF } = useSwr(['/user/friends', 'POST'], swrFetcher, {
    refreshInterval: 1,
  });
  const { data: fetchedInvites, error: errorI } = useSwr(['/user/invite/get', 'POST'], swrFetcher, {
    refreshInterval: 1,
  });
  const { data: fetchedUserData, error: errorU } = useSwr(['/auth', 'POST'], swrFetcher, {
    refreshInterval: 1,
  });

  useEffect(() => {
    if (!user) {
      router.push('/singup');
    }
  }, [router.asPath]);

  useEffect(() => {
    if (!errorF && fetchedFriends && fetchedFriends.length !== friends.length) {
      disptach(updateFriends(fetchedFriends.data));
    }
  }, [fetchedFriends, errorF]);

  useEffect(() => {
    if (!errorI && fetchedInvites && fetchedInvites.length !== invites.length) {
      disptach(updateInvites(fetchedInvites));
    }
  }, [fetchedInvites, errorI]);

  useEffect(() => {
    if (!errorU && fetchedUserData && fetchedUserData.user) {
      const fetchedUser = fetchedUserData.user.value;

      if (!_.isEqual(fetchedUser, user)) {
        disptach(login(fetchedUser));
      }
    }
  }, [fetchedUserData, errorU]);

  return (
    <Template>
      <Navigation />
      {children}
    </Template>
  );
};

export { MainTemplate };
