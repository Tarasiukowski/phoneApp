import styled from 'styled-components';

export const Input = styled.input`
  background: rgb(29, 29, 41);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  width: 315px;
  color: #ebebf5;
  padding: 1.2rem 2rem;
  font-weight: 500;
  font-size: 1.8rem;
  margin-bottom: 15px;
  transition: 240ms ease 0ms;

  :focus {
    border-color: rgb(112, 70, 227);
    box-shadow: rgb(155 112 255 / 18%) 0px 0px 0px 3px;
  }
`;
