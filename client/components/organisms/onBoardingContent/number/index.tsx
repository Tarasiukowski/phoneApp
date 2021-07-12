import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from 'components/atoms';
import { SelectNumberButton, SelectNumberList } from 'components/molecules';
import { RedirectTemplate } from 'templates';

import { fetcher, handleNotAllowedError, handleRequestError } from 'utils';
import { useError } from 'contexts';
import { useUser } from 'setup/reducers/userReducer';
import styles from './number.module.scss';
import { paths } from '../../../../constants';

const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [number, setNumber] = useState<string | null>(null);

  const user = useUser();

  const { setError } = useError();

  useEffect(() => {
    setNumber(user ? user.number : null);
  }, []);

  const toggleOpenList = useCallback(() => {
    setOpenList(!openList);
  }, []);

  const next = useCallback(async () => {
    try {
      await fetcher('PUT', '/user/update', { number });
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
      return;
    }

    try {
      await fetcher('PUT', '/user/update/redirectTo', {
        value: paths.onBoarding.account,
      });
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
      return;
    }

    setRedirect(true);
  }, []);

  const handleSelectNumberList = useMemo(
    () => ({
      onSelectNumber: (number: string) => {
        setNumber(number);
      },
      onClose: () => {
        setOpenList(false);
      },
    }),
    [],
  );

  return (
    <RedirectTemplate redirectTo={paths.onBoarding.account} isRedirect={redirect}>
      <div className={styles.wrapper}>
        <h4>Your phone number</h4>
        <h6>You can add more phone numbers later.</h6>
        <SelectNumberButton onClick={toggleOpenList} number={number} />
        <Button onClick={next} disabled={!number} style={{ margin: '32px 0 0 0' }} width="100%">
          Continue
        </Button>
        {openList && <SelectNumberList {...handleSelectNumberList} />}
      </div>
    </RedirectTemplate>
  );
};

export { OnboardingNumberContent };
