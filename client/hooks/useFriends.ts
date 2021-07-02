import { useSelector } from 'react-redux';

import { selectFriends } from '../reducers/friendsReducer';

export const useFriends = () => {
  const friends = useSelector(selectFriends);

  return friends;
};
