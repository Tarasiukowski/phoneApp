import { createContext, useState, useContext, useCallback, useMemo } from 'react';

import { searcherContext, props } from './types';

const SearcherContext = createContext<searcherContext>({ open: false, handleVisible: () => {} });

const SearcherProvider = ({ children }: props) => {
  const [open, setOpen] = useState(false);

  const handleVisible = useCallback((visible: boolean) => {
    setOpen(visible);
  }, []);

  const passValue = useMemo(() => ({ open, handleVisible }), [open]);

  return <SearcherContext.Provider value={passValue}>{children}</SearcherContext.Provider>;
};

const useSearcher = () => {
  const context = useContext(SearcherContext);

  if (context === undefined) {
    throw new Error('useSearcher must be used within a SearcherProvider');
  }

  return context;
};

export { SearcherProvider, useSearcher };
