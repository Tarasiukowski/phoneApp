import styled from 'styled-components'

export const TextArea = styled.textarea`
  resize: none;
  background: #1a1a25;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  width: 87%;
  height: 80px;
  color: #ebebf5;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 10px;
  transition: 240ms ease 0ms;
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 10px;

  :focus {
    border-color: rgb(112,70,227);
    box-shadow: rgb(155 112 255 / 18%) 0px 0px 0px 3px;
  }
`