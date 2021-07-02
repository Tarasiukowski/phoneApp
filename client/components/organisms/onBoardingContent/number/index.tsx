import { useEffect, useState } from 'react';

import { Button } from '../../../atoms';
import { SelectNumberButton, SelectNumberList } from '../../../molecules';
import { RedirectTemplate } from '../../../../templates';

import { fetcher, handleNotAllowedError } from '../../../../utils';
import { useError } from '../../../../contexts';
import { useUser } from '../../../../hooks';
import styles from './number.module.scss';

const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [number, setNumber] = useState<string | null>(null);

  const user = useUser();

  const { setError } = useError();

  useEffect(() => {
    setNumber(user ? user.number : null);
  }, []);

  const toggleOpenList = () => {
    setOpenList(!openList);
  };

  const next = async () => {
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
      await fetcher('PUT', '/user/update', {
        redirectTo: '/onboarding/account',
      });
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
      return;
    }

    setRedirect(true);
  };

  return (
    <RedirectTemplate redirectTo="/onboarding/account" isRedirect={redirect}>
      <div className={styles.wrapper}>
        <h4>Your phone number</h4>
        <h6>You can add more phone numbers later.</h6>
        <SelectNumberButton onClick={toggleOpenList} number={number} />
        <Button onClick={next} disabled={!number} style={{ margin: '32px 0 0 0' }} width="100%">
          Continue
        </Button>
        {openList && (
          <SelectNumberList
            onSelectNumber={(number) => {
              setNumber(number);
            }}
            onClose={() => {
              setOpenList(false);
            }}
          />
        )}
      </div>
    </RedirectTemplate>
  );
};

export { OnboardingNumberContent };
