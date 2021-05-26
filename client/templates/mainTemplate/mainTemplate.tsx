import { useEffect } from 'react';
import useSwr from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Navigation from '../../components/molecules/navigation/navigation';

import { swrFetcher } from '../../utils';
import { selectUser } from '../../reducers/userReducer';
import { selectInvites, update as updateI } from '../../reducers/invitesReducer';
import { selectFriends, update as updateF } from '../../reducers/friendsReducer';

const MainTemplate: React.FC = ({ children }) => {
  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);
  const invites = useSelector(selectInvites);

  const disptach = useDispatch();

  const { data: fetchedFriends, error: errorF } = useSwr(['user/friends', user.email], swrFetcher);
  const { data: fetchedInvites, error: errorI } = useSwr(
    ['user/invite/get', user.email],
    swrFetcher,
  );

  useEffect(() => {
    if (!errorF && fetchedFriends && fetchedFriends.length !== friends.length) {
      disptach(updateF(fetchedFriends));
    }
  }, [fetchedFriends, errorF]);

  useEffect(() => {
    if (!errorI && fetchedInvites && fetchedInvites.length !== invites.length) {
      disptach(updateI(fetchedInvites));
    }
  }, [fetchedInvites, errorI]);

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
