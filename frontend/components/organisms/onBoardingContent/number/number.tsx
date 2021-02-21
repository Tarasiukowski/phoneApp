import { useState } from 'react';
import SelectNumberButton from '../../../atoms/selectNumber/button/button';
import SelectNumberList from '../../../atoms/selectNumber/list/list';
import { Button } from '../../../atoms/button/button';
import styles from './number.module.scss';

const OnboardingNumberContent = () => {
  const [openList, setOpenList] = useState(false);

  const toggleOpenList = () => {
    setOpenList(!openList);
  };

  return (
    <div className={styles.wrapper}>
      <h4>Your phone number</h4>
      <h6>You can add more phone numbers later.</h6>
      <SelectNumberButton onClick={toggleOpenList} />
      <Button disabled={true}  margin="32px 0 0 0" width="100%">
        Continue
      </Button>
      {openList && <SelectNumberList setOpenList={setOpenList} />}
    </div>
  );
};

export default OnboardingNumberContent;
