import styled, { css } from 'styled-components';

import { propsImage } from './types';

export const Image = styled.div<propsImage>`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  pointer-events: none;
  cursor: default;

  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }

  ${({ colorImage, image }) =>
    image
      ? css`
    background-image: url(${image});
    background-size cover;
    background-position: center;
    `
      : css`
          background-color: ${colorImage};
        `}

  ${({ extraStyle }) =>
    extraStyle &&
    css`
      margin: ${extraStyle.margin};
      width: ${extraStyle.size};
      height: ${extraStyle.size};

      p {
        font-size: ${extraStyle.fontSize};
      }
    `}

  ${({ big }) =>
    big &&
    css`
      width: 40px;
      height: 40px;

      p {
        font-size: 1.4rem;
      }
    `}

  ${({ mini }) =>
    mini &&
    css`
      width: 20px;
      height: 20px;

      p {
        font-size: 0.7rem;
      }
    `}
`;
