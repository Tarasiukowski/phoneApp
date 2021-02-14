import styled, { css } from 'styled-components';
import { typeButton } from '../../../interfaces';

export const Button = styled.button<typeButton>`
  width: 315px;
  color: white;
  background: #6333ff;
  padding: 9px 16px;
  font-size: 0.865rem;
  font-weight: 600;
  font-size: 1.5rem;
  transition: background 0.3s ease 0ms;
  border-radius: 4px;

  ${({ transparent }) => transparent && css`
    width: auto;
    height: auto;
    padding: 8px 14px;
    font-size: 1.3rem;
    margin-left: 37px;
    background: transparent;

    :hover {
      background: rgba(235, 235, 245, 0.08);
    }
  `}

  ${({ disabled, transparent }) =>
    disabled
      ? css`
          color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.12);
          cursor: default;
        `
      : !transparent && css`
          :hover {
            background: rgb(69, 35, 178);
          }
        `}
`;
