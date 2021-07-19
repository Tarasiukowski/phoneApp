import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { loadingContext, props } from './types';

const LoadingContext = createContext<loadingContext>({
  loading: false,
  toggleLoading: () => {},
});

const LoadingProvider = ({ children }: props) => {
  const [loading, setLoading] = useState(true);

  const toggleLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const passValue = useMemo(
    () => ({
      loading,
      toggleLoading,
    }),
    [loading],
  );

  return <LoadingContext.Provider value={passValue}>{children}</LoadingContext.Provider>;
};

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  return context;
};

export { LoadingProvider, useLoading };
