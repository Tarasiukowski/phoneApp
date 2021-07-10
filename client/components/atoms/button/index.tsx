import styled, { css } from 'styled-components';

import { props } from './types';

const defaultWidth = '315px';

export const Button = styled.button<props>`
  width: ${({ width }) => (width ? width : `${defaultWidth}`)};
  color: white;
  background: rgb(112, 70, 227);
  padding: 9px 16px;
  font-size: 0.865rem;
  font-weight: 600;
  font-size: 1.5rem;
  transition: background 0.3s ease 0ms;
  border-radius: 4px;
  cursor: pointer;

  svg {
    pointer-events: none;
  }

  ${({ waring }) =>
    waring &&
    css`
      background-color: transparent;
      color: #e85c5c;
      transition: 0s;

      :hover {
        background-color: rgba(232, 92, 92, 0.1);
      }
    `}

  ${({ transparent }) =>
    transparent &&
    css`
      background: transparent;

      :hover {
        background: rgba(235, 235, 245, 0.08);
      }
    `}

  ${({ alert }) =>
    alert &&
    css`
      color: #e85c5c;

      :hover {
        background: rgba(232, 92, 92, 0.1);
      }
    `}

    ${({ disabled }) =>
    disabled &&
    css`
      color: rgba(255, 255, 255, 0.3) !important;
      background: rgb(36, 36, 51) !important;
      cursor: default;
    `}
`;
