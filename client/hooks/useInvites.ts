import { useSelector } from 'react-redux';

import { selectInvites } from 'setup/reducers/invitesReducer';

export const useInvites = () => {
  const invites = useSelector(selectInvites);

  return invites;
};
