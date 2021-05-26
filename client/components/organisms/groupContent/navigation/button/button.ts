import styled, { css } from 'styled-components';

import { props } from './types';

export const Button = styled.button<props>`
  background-color: transparent;
  color: rgb(238, 238, 240);
  height: 31px;
  padding: 0px 12px;
  border-radius: 5px;
  font-weight: 600;
  border: 1px solid transparent;

  ${({ active, filter }) =>
    active && !filter
      ? css`
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.5);
        `
      : css`
          :hover {
            background-color: rgba(255, 255, 255, 0.05);
          }
        `}

  ${({ filter, active }) =>
    filter &&
    css`
      border: 1px dashed rgba(255, 255, 255, 0.2);

      ${active &&
      css`
        border: 1px solid rgb(155, 112, 255);
        background-color: rgb(155, 112, 255, 0.1);

        :hover {
          background-color: rgb(155, 112, 255, 0.1);
        }
      `}
    `}
`;
