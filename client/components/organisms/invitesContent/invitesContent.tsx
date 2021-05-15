import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UsersList from '../../molecules/usersList/usersList';

import { selectInvites, update } from '../../../reducers/invitesReducer';
import { fetcher } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';

const InvitesContent = () => {
  const dispatch = useDispatch();

  const { email } = useSelector(selectUser);
  const invites = useSelector(selectInvites);

  useEffect(() => {
    fetcher('POST', 'user/invite/get', {
      email,
    }).then((invites) => {
      dispatch(update(invites));
    });
  });

  return <UsersList name="invites" data={invites} detailedUser={invites[0]} />;
};

export default InvitesContent;
