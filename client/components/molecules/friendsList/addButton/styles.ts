import styled from 'styled-components';

export const Button = styled.div`
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
    pointer-events: none;
  }

  p {
    font-size: 1.2rem;
    font-weight: 600;
    margin-left: 15px;
    pointer-events: none;
  }

  :hover {
    background-color: #4b4b663b;
  }
`;
