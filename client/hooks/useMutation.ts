import { useCallback, useState } from 'react';

export type Status = 'idle' | 'loading' | 'error' | 'success';

export const useMutation = <Params extends Array<unknown>>(
  mutation: (...params: Params) => Promise<any>,
) => {
  const [status, setStatus] = useState<Status>('idle');

  const mutate = useCallback(
    async (...params: Params) => {
      setStatus('loading');
      try {
        setStatus('success');

        return await mutation(...params);
      } catch (err) {
        setStatus('error');
        throw err;
      }
    },
    [mutation],
  );

  return { mutate, status };
};
