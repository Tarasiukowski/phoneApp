import { useEffect } from 'react';

export const useListUpdate = (
  error: Error,
  fetchedData: any[],
  activeData: any[],
  cb: () => void,
) => {
  useEffect(() => {
    if(!error && fetchedData && fetchedData.length !== activeData.length) {
      cb()
    }
  }, [error, fetchedData]);
};
