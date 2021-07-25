import { useEffect } from 'react';

import { Member } from 'interfaces';

export const useListUpdate = (
  error: Error,
  fetchedData: Member[],
  activeData: Member[],
  cb: () => void,
) => {
  useEffect(() => {
    if (!error && fetchedData && fetchedData.length !== activeData.length) {
      cb();
    }
  }, [error, fetchedData]);
};
