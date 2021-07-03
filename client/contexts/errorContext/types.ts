import { Dispatch, SetStateAction } from 'react';

import { Error } from 'interfaces';

export type errorContext = {
  error: Error | null;
  setError: Dispatch<SetStateAction<Error | null>>;
};
