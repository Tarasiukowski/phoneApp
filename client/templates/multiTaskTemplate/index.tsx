import { Multitask } from 'components/molecules';

import { useMultiTask } from 'contexts';

const MultiTaskTemplate: React.FC = ({ children }) => {
  const { open, handle } = useMultiTask();

  return (
    <>
      {handle && <Multitask open={open} {...handle} />}
      {children}
    </>
  );
};

export { MultiTaskTemplate };
