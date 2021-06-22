import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../../atoms';
import { SelectNumberButton, SelectNumberList } from '../../../molecules';
import { RedirectTemplate } from '../../../../templates';

import { selectUser } from '../../../../reducers/userReducer';
import { fetcher } from '../../../../utils';
import { ErrorContext } from '../../../../contexts';
import styles from './number.module.scss';

const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [number, setNumber] = useState<string | null>(null);

  const user = useSelector(selectUser);

  const { setError } = useContext(ErrorContext);

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
      const { errorMsg } = err.response.data;

      setError({ msg: errorMsg, id: Math.random() });
      window.location.reload();
      return;
    }

    try {
      await fetcher('PUT', '/user/update', {
        redirectTo: '/onboarding/account',
      });
    } catch (err) {
      const { errorMsg } = err.response.data;

      setError({ msg: errorMsg, id: Math.random() });
      window.location.reload();
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
