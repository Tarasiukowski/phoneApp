import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SelectNumberButton from '../../../atoms/selectNumber/button/button';
import SelectNumberList from '../../../atoms/selectNumber/list/list';
import { Button } from '../../../atoms/button/button';
import { selectUser } from '../../../../reducers/userReducer';
import styles from './number.module.scss';

const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState<boolean>(false);
  const [number, setNumber] = useState<string | null>(null);

  const user = useSelector(selectUser);

  useEffect(() => {
    setNumber(user ? user.number : null);
  });

  const toggleOpenList = () => {
    setOpenList(!openList);
  };

  return (
    <div className={styles.wrapper}>
      <h4>Your phone number</h4>
      <h6>You can add more phone numbers later.</h6>
      <SelectNumberButton onClick={toggleOpenList} number={number} />
      <Button disabled={!number} margin="32px 0 0 0" width="100%">
        Continue
      </Button>
      {openList && <SelectNumberList setNumber={setNumber} setOpenList={setOpenList} />}
    </div>
  );
};

export default OnboardingNumberContent;
