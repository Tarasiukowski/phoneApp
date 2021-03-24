import { Dispatch, SetStateAction } from 'react';
import Item from '../item/item';

interface props {
  numbers: string[];
  setNumber: Dispatch<SetStateAction<string | null>>;
}

const NumbersList = ({ numbers, setNumber }: props) => {
  const selectNumber = (number: string) => {
    setNumber(number);
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
