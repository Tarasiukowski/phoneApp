import { createContext, useCallback, useContext, useState } from 'react';

import { multiTaskContext, Handle, ToggleOpen } from './types';

const MultiTaskContext = createContext<multiTaskContext>({
  open: false,
  handle: undefined,
  toggleOpen() {},
});

const MultiTaskProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [handle, setHanlde] = useState<Handle | undefined>(undefined);

  const toggleOpen: ToggleOpen = useCallback((value, handle) => {
    setOpen(value);

    if (value && handle) {
      setHanlde(handle);
      return;
    }

    setHanlde(undefined);
  }, []);

  const passValue = {
    open,
    handle,
    toggleOpen,
  };

  return <MultiTaskContext.Provider value={passValue}>{children}</MultiTaskContext.Provider>;
};

const useMultiTask = () => {
  const context = useContext(MultiTaskContext);

  if (context === undefined) {
    throw new Error('useMultiTask must be used within a MultiTaskProvider');
  }

  return context;
};

export { MultiTaskProvider, useMultiTask };
