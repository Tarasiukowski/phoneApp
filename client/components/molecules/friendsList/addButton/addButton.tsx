import styled from 'styled-components';

import AddSvg from '../../../../public/svgs/add.svg';

const Button = styled.div`
  width: 93%;
  height: 30px;
  background: transparent;
  border-radius: 5px;
  color: #9b70ff;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 2px;

  svg {
    margin-left: 13px;
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 15px;
  }

  :hover {
    background-color: #4b4b663b;
  }
`;

const AddButton = ({ id, onClick }: { id: string; onClick: () => void }) => (
  <Button onClick={onClick} id={id}>
    <AddSvg id={id} />
    <p id={id}>Invite your friend</p>
  </Button>
);

export default AddButton;
