import { useEffect } from 'react';
import _ from 'lodash';

import { User } from 'interfaces';

type FetchedUserData = {
  user: {
    value: User
  }
}

export const useUpdateUser = (
  error: Error,
  fetchedUserData: FetchedUserData,
  user: User,
  cb: (fetchedUser: User) => void,
) => {
  useEffect(() => {
    if (!error && fetchedUserData && fetchedUserData.user) {
      const fetchedUser = fetchedUserData.user.value;

      const isSame = _.isEqual(fetchedUser, user);

      if (!isSame) {
        cb(fetchedUser);
      }
    }
  }, [fetchedUserData, error]);
};
