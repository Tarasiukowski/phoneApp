import { createContext, useState, useContext } from 'react';

import { errorContext } from './types';
import { Error } from 'interfaces';

const ErrorContext = createContext<errorContext>({ error: null, setError: () => {} });

const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const passValue = {
    error,
    setError,
  };

  return <ErrorContext.Provider value={passValue}>{children}</ErrorContext.Provider>;
};

const useError = () => {
  const context = useContext(ErrorContext);

  if (context === undefined) {
    throw new Error('useError must be used within a ErrorProvider');
  }
  return context;
};

export { ErrorProvider, useError };
