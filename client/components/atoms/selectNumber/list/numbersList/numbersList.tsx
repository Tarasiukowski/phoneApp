import Item from '../item/item';
import Spinner from '../../../spinner/spinner';

import { propsSelectNumbersList } from '../../types';

const NumbersList = ({ numbers, setNumber, setOpenList }: propsSelectNumbersList) => {
  const selectNumber = (number: string) => {
    setNumber(number);
    setOpenList(false);
  };

  return (
    <>
      {numbers.length ? (
        <>
          {numbers.map((number) => (
            <Item onClick={() => selectNumber(number)} key={number} number={number} />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default NumbersList;
