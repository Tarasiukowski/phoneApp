import styled from 'styled-components'

export const Textarea = styled.input`
  resize: none;
  background: #21212c;
  border: 1px solid #4c4d56; 
  width: 55%;
  height: 75%;
  border-radius: 5px;
  transition: 240ms ease 0ms;
  text-align: center;
  text-align: left;
  color: white;
  font-weight: 600;
  padding: 0 20px;

  :focus {
    border-color: rgb(112,70,227);
    background: rgb(155 112 255 / 10%);

  }
`