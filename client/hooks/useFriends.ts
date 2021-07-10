import { useSelector } from 'react-redux';

import { selectFriends } from 'setup/reducers/friendsReducer';

export const useFriends = () => {
  const friends = useSelector(selectFriends);

  return friends;
};
