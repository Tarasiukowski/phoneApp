import { useSelector } from 'react-redux';

import { selectInvites } from '../reducers/invitesReducer';

export const useInvites = () => {
  const invites = useSelector(selectInvites);

  return invites;
};
