import { Spinner } from '../../../../atoms';
import Item from '../item';

import { propsSelectNumbersList } from '../../types';

const NumbersList = ({ numbers, onSelectNumber }: propsSelectNumbersList) => (
  <>
    {numbers.length ? (
      <>
        {numbers.map((number) => (
          <Item onClick={() => onSelectNumber(number)} key={number} number={number} />
        ))}
      </>
    ) : (
      <Spinner />
    )}
  </>
);
export default NumbersList;
