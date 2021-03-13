import Item from '../item/item';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../reducers/userReducer';
import axios from 'axios';

interface props {
  numbers: string[];
}

const NumbersList = ({ numbers }: props) => {
  const user = useSelector(selectUser);

  const selectNumber = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;

    axios.post('http://localhost:7000/user/update', {
      email: user.email,
      number: target.lastChild?.textContent,
    });
  };

  return (
    <>
      {numbers.length ? (
        <>
          {numbers.map((number) => (
            <Item onClick={selectNumber} key={number} number={number} />
          ))}
        </>
      ) : null}
    </>
  );
};

export default NumbersList;
