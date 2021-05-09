import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SelectNumberButton from '../../../atoms/selectNumber/button/button';
import SelectNumberList from '../../../atoms/selectNumber/list/list';
import RedirectTemplate from '../../../../templates/redirectTemplate/redirectTemplate';
import { Button } from '../../../atoms/button/button';
import Alert from '../../../atoms/alert/alert';

import { selectUser } from '../../../../reducers/userReducer';
import { updateUser } from '../../../../utils';
import styles from './number.module.scss';
import { Error } from '../../../../interfaces';

const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
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

    data = await updateUser([{ email: user.email, number }]);

    if (data.error) {
      setError({ msg: data.errorMsg, id: Math.random() });
      window.location.reload();
      return;
    }

    data = await updateUser([{ email: user.email, redirectTo: '/onboarding/account' }]);

    if (data.error) {
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
        <Button onClick={next} disabled={!number} margin="32px 0 0 0" width="100%">
          Continue
        </Button>
        {openList && <SelectNumberList setNumber={setNumber} setOpenList={setOpenList} />}
      </div>
      <Alert error={error} />
    </RedirectTemplate>
  );
};

export default OnboardingNumberContent;
