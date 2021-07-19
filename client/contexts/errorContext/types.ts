import { Dispatch, SetStateAction } from 'react';

import { Error, RequireChildren } from 'interfaces';

export type props = RequireChildren

export type errorContext = {
  error: Error | null;
  setError: Dispatch<SetStateAction<Error | null>>;
};
