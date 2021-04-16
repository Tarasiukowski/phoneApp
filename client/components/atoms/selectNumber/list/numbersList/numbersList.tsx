import { Dispatch, SetStateAction } from 'react';
import Item from '../item/item';

interface props {
  numbers: string[];
  setNumber: Dispatch<SetStateAction<string | null>>;
  setOpenList: Dispatch<SetStateAction<boolean>>;
}

const NumbersList = ({ numbers, setNumber, setOpenList }: props) => {
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
      ) : null}
    </>
  );
};

export default NumbersList;
