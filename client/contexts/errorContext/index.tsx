import { createContext, useState, useContext, useMemo } from 'react';

import { errorContext } from './types';

const ErrorContext = createContext<errorContext>({ error: null, setError: () => {} });

const ErrorProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<errorContext['error']>(null);

  const passValue = useMemo(
    () => ({
      error,
      setError,
    }),
    [error],
  );

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
