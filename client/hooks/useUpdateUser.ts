import { useEffect } from 'react';
import isEqual from 'lodash/isEqual';

import { User } from 'interfaces';

type FetchedUserData = {
  user: {
    value: User;
  };
};

export const useUpdateUser = (
  error: Error,
  fetchedUserData: FetchedUserData,
  user: User | null,
  cb: (fetchedUser: User) => void,
) => {
  useEffect(() => {
    if (!error && fetchedUserData?.user) {
      const fetchedUser = fetchedUserData.user.value;

      const isSame = isEqual(fetchedUser, user);

      if (!isSame) {
        cb(fetchedUser);
      }
    }
  }, [fetchedUserData, error]);
};
