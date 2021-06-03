import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Button } from '../../../atoms';
import SelectNumberButton from '../../../molecules/selectNumber/button/button';
import SelectNumberList from '../../../molecules/selectNumber/list/list';
import { RedirectTemplate } from '../../../../templates';

import { selectUser } from '../../../../reducers/userReducer';
import { fetcher } from '../../../../utils';
import styles from './number.module.scss';
import { Error } from '../../../../interfaces';

export const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [number, setNumber] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const user = useSelector(selectUser);

  useEffect(() => {
    setNumber(user ? user.number : null);
  }, []);

  const toggleOpenList = () => {
    setOpenList(!openList);
  };

  const next = async () => {
    let data;

    data = await fetcher('PUT', '/user/update', { email: user.email, number });

    if (data.errorMsg) {
      setError({ msg: data.errorMsg, id: Math.random() });
      window.location.reload();
      return;
    }

    data = await fetcher('PUT', '/user/update', {
      email: user.email,
      redirectTo: '/onboarding/account',
    });

    if (data.errorMsg) {
      setError({ msg: data.errorMsg, id: Math.random() });
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
        {openList && <SelectNumberList setNumber={setNumber} setOpenList={setOpenList} />}
      </div>
      <Alert error={error} />
    </RedirectTemplate>
  );
};
