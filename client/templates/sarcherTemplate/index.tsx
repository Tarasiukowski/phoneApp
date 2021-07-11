import { useCallback } from 'react';

import { Searcher } from 'components/molecules';

import { useSearcher } from 'contexts';

const SearcherTemplate: React.FC = ({ children }) => {
  const { open, handleVisible } = useSearcher();

  const handleOnClose = useCallback(() => {
    handleVisible(false);
  }, []);

  return (
    <>
      <Searcher open={open} onClose={handleOnClose} />
      {children}
    </>
  );
};

export { SearcherTemplate };
