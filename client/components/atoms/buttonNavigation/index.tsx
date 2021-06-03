import { forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import { props, propsButton } from './types';

const Button = forwardRef<HTMLButtonElement, props>(
  ({ icon, active, button, href, content, ...restProps }, ref) => {
    const { asPath } = useRouter();

    return (
      <StyledButton
        ref={ref}
        active={asPath === href || asPath.startsWith(`/${content.toLocaleLowerCase()}`)}
        {...restProps}
      >
        {icon()} <span>{content}</span>
      </StyledButton>
    );
  },
);

const ButtonNavigation = ({ href, ...restProps }: props) =>
  href ? (
    <Link href={href} children={<Button href={href} {...restProps} />} />
  ) : (
    <Button {...restProps} />
  );

const StyledButton = styled.button<propsButton>`
  color: #eeeef0;
  cursor: pointer;
  height: 30px;
  margin: 0 8px 2px;
  display: flex;
  padding: 0 8px;
  z-index: 1;
  position: relative;
  align-items: center;
  border-radius: 5px;
  width: 90%;
  background-color: transparent;

  span {
    margin-left: 15px;
    font-weight: 600;
    font-size: 1.4rem;
    pointer-events: none;
  }

  svg {
    margin-left: 2px;
    fill: rgb(151, 151, 176);
    pointer-events: none;
  }

  :hover {
    background-color: #4b4b663b;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #4b4b663b;
    `}

  ${({ size }) =>
    size &&
    css`
      width: ${size.width};
      height: ${size.height};
    `}

  ${({ iconSettings }) =>
    iconSettings &&
    css`
      svg {
        margin-left: ${iconSettings.marginLeft};
      }
    `}
`;

export { ButtonNavigation };
