import styled, { keyframes, css } from 'styled-components';

import { props } from './types';

const spinner = keyframes`
  0% {
    stroke-dashoffset: 33px;
    transform: rotatey(0deg) rotate(0deg);
  }
  25% {
    stroke-dashoffset: 11px;
    transform: rotatey(0deg) rotate(0deg);
  }
  25.0001% {
    stroke-dashoffset: 11px;
    transform: rotatey(180deg) rotate(270deg);
  }
  50% {
    stroke-dashoffset: 33px;
    transform: rotatey(180deg) rotate(270deg);
  }
  50.0001% {
    stroke-dashoffset: 33px;
    transform: rotatey(0deg) rotate(180deg);
  }
  75% {
    stroke-dashoffset: 11px;
    transform: rotatey(0deg) rotate(180deg);
  }
  75.0001% {
    stroke-dashoffset: 11px;
    transform: rotatey(180deg) rotate(90deg);
  }
  100% {
    stroke-dashoffset: 33px;
    transform: rotatey(180deg) rotate(90deg);
  }
`;

const rotation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Content = styled.div<props>`
  .spinner {
    width: 30px;
    height: 30px;
    margin: auto;
    margin-top: 10px;

    ${({ mini }) =>
      mini &&
      css`
        width: 24px;
        height: 24px;
      `}

    ${({ extraStyle }) =>
      extraStyle &&
      css`
        margin-bottom: 10px;
      `}

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      animation: ${rotation} 1455ms infinite linear;
    }

    circle {
      stroke: currentColor;
      stroke-dasharray: 44px;
      stroke-dashoffset: 11px;
      transform-origin: center;
      transform: rotatey(180deg) rotate(90deg);
      animation: ${spinner} 3850ms infinite ease;
      color: white;
    }
  }
`;
