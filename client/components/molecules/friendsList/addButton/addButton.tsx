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

const AddButton = () => (
  <Button>
    <AddSvg />
    <p>Invite your friend</p>
  </Button>
);

export default AddButton;
