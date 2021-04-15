import styled, { css } from 'styled-components';
import { propsButton } from '../../../interfaces';

export const Button = styled.button<propsButton>`
  width: ${({ width }) => (width ? width : '315px')};
  color: white;
  background: rgb(112, 70, 227);
  padding: 9px 16px;
  font-size: 0.865rem;
  font-weight: 600;
  font-size: 1.5rem;
  transition: background 0.3s ease 0ms;
  border-radius: 4px;
  margin: ${({ margin }) => (margin ? margin : null)};

  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: ${absolute.top};
      bottom: ${absolute.bottom};
      right: ${absolute.right};
      left: ${absolute.left};
    `}

  ${({ transparent }) =>
    transparent &&
    css`
      width: auto;
      height: auto;
      padding: 8px 12px;
      font-size: 1.3rem;
      margin-left: 37px;
      background: transparent;

      :hover {
        background: rgba(235, 235, 245, 0.08);
      }
    `}

      ${({ disabled }) =>
    disabled &&
    css`
      color: rgba(255, 255, 255, 0.3);
      background: rgb(36, 36, 51);
      cursor: default;
    `}

    ${({ alert }) =>
    alert &&
    css`
      color: #e85c5c;

      :hover {
        background: rgba(232, 92, 92, 0.1);
      }
    `}
`;
