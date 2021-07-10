import { useSelector } from 'react-redux';

import { selectBlocklist } from 'setup/reducers/blocklistReducer';

export const useBlocklist = () => {
  const blocklist = useSelector(selectBlocklist);

  return blocklist;
};
