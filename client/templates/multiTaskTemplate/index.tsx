import { Multitask } from 'components/molecules';

import { useMultiTask } from 'contexts';

const MultiTaskTemplate: React.FC = ({ children }) => {
  const { open, handle } = useMultiTask();

  return (
    <>
      {open && handle && <Multitask {...handle} />}
      {children}
    </>
  );
};

export { MultiTaskTemplate };
