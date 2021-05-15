import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSwr from 'swr';

import UsersList from '../../molecules/usersList/usersList';

import { selectFriends, update } from '../../../reducers/friendsReducer';
import { selectUser } from '../../../reducers/userReducer';
import { swrFetcher } from '../../../utils';

const InvitesContent = () => {
  const { email } = useSelector(selectUser);

  const { data, error } = useSwr(['user/friends', email], swrFetcher);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      dispatch(update(data));
    }
  }, [data, error]);

  const friends = useSelector(selectFriends);

  return <UsersList name="contacts" data={friends} detailedUser={friends[0]} />;
};

export default InvitesContent;
