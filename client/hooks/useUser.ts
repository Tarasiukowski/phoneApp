import { useSelector } from 'react-redux';

import { selectUser } from 'setup/reducers/userReducer';

export const useUser = () => {
  const user = useSelector(selectUser);

  return user
};
