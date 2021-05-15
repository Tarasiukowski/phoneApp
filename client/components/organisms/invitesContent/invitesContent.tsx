import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSwr from 'swr';

import UsersList from '../../molecules/usersList/usersList';

import { selectInvites, update } from '../../../reducers/invitesReducer';
import { selectUser } from '../../../reducers/userReducer';
import { swrFetcher } from '../../../utils';

const InvitesContent = () => {
  const { email } = useSelector(selectUser);

  const { data, error } = useSwr(['user/invite/get', email], swrFetcher);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      dispatch(update(data));
    }
  }, [data, error]);

  const invites = useSelector(selectInvites);

  return <UsersList name="invites" data={invites} detailedUser={invites[0]} />;
};

export default InvitesContent;
