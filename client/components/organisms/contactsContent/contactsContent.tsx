import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UsersList from '../../molecules/usersList/usersList';

import { fetcher } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';
import { selectFriends, update } from '../../../reducers/friendsReducer';

const ContactsContent = () => {
  const dispatch = useDispatch();

  const { email } = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  useEffect(() => {
    fetcher('POST', 'user/friends', {
      email,
    }).then((friends) => {
      dispatch(update(friends));
    });
  });

  return <UsersList name="contacts" data={friends} detailedUser={friends[0]} />;
};

export default ContactsContent;
