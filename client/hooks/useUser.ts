import { useSelector } from 'react-redux';

import { selectUser } from '../reducers/userReducer';

export const useUser = () => {
  const user = useSelector(selectUser);

  return user
};
