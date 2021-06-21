import { createContext, useState } from 'react';

import { errorContext } from './types';
import { Error } from '../../interfaces';

export const ErrorContext = createContext<errorContext>({ error: null, setError: () => {} });

const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const passValue = {
    error,
    setError,
  };

  return <ErrorContext.Provider value={passValue}>{children}</ErrorContext.Provider>;
};

export { ErrorProvider };
