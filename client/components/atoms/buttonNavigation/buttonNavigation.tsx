import styled from 'styled-components';
import { ButtonNavigation as propsButtonNavigation } from '../../../interfaces';

const Button = styled.button`
  color: #eeeef0;
  cursor: pointer;
  height: 30px;
  margin: 0 8px 2px;
  display: flex;
  padding: 0 8px;
  z-index: 1;
  position: relative;
  align-items: center;
  border-radius: 5px;
  width: 90%;
  background-color: transparent;

  span {
    margin-left: 15px;
    font-weight: 600;
    font-size: 1.4rem;
  }

  svg {
    margin-left: 2px;
    fill: rgb(151, 151, 176);
  }

  :hover {
    background-color: #4b4b663b;
  }
`;

const ButtonNavigation = ({ icon, content }: propsButtonNavigation) => (
  <Button>
    {icon} <span>{content}</span>
  </Button>
);

export default ButtonNavigation;
