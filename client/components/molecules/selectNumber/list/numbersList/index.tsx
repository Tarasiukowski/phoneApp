import { Spinner } from '../../../../atoms';
import Item from '../item';

import { props } from './/types';

const NumbersList = ({ numbers, onSelectNumber }: props) => (
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
