import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'components/atoms';
import { SelectNumberButton, SelectNumberList } from 'components/molecules';

import { handleRequestError, updateUser } from 'utils';
import { useError, useLoading } from 'contexts';
import { useUser } from 'setup/reducers/userReducer';
import styles from './number.module.scss';
import { paths } from '../../../../constants';
import { useDidMount, useMutation } from 'hooks';

const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [number, setNumber] = useState<string | null>(null);

  const router = useRouter();

  const user = useUser();
  const { setError } = useError();
  const { toggleLoading } = useLoading();
  const { mutate, status } = useMutation(updateUser);

  const disabled = !number || status === 'loading';

  useDidMount(() => {
    setNumber(user ? user.number : null);
  });

  const toggleOpenList = useCallback(() => {
    setOpenList(!openList);
  }, []);

  const next = useCallback(async () => {
    try {
      number && (await mutate('number', number));

      await mutate('onBoarding', {
        value: false,
        stage: paths.onBoarding.account,
      });

      toggleLoading(true);
      router.push(paths.onBoarding.account);
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
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
    <div className={styles.wrapper}>
      <h4>Your phone number</h4>
      <h6>You can add more phone numbers later.</h6>
      <SelectNumberButton onClick={toggleOpenList} number={number} />
      <Button onClick={next} disabled={disabled} style={{ margin: '32px 0 0 0' }} width="100%">
        Continue
      </Button>
      {openList && <SelectNumberList {...handleSelectNumberList} />}
    </div>
  );
};

export { OnboardingNumberContent };
