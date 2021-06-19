import { Button } from './styles';

import AddSvg from '../../../../public/svgs/add.svg';
import { props } from './types';

const AddButton = ({ id, onClick }: props) => (
  <Button onClick={onClick} id={id}>
    <AddSvg />
    <p>Invite your friend</p>
  </Button>
);

export default AddButton;
