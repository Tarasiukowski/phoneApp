import { forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import { props, propsButton } from './types';

const Button = forwardRef<HTMLButtonElement, props>(
  ({ icon, active, button, href, content, id, ...settings }, ref) => {
    const { asPath } = useRouter();

    return (
      <StyledButton
        ref={ref}
        id={id}
        active={asPath === href || asPath.startsWith(`/${content.toLocaleLowerCase()}`)}
        {...settings}
      >
        {icon} <span id={id}>{content}</span>
      </StyledButton>
    );
  },
);

const ButtonNavigation = ({ href, ...restProps }: props) => {
  return ( 
    <>
      {href ? (
        <Link href={href} children={<Button href={href} {...restProps} />} />
      ) : (
        <Button {...restProps} />
      )}
    </>
  );
};

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
  }

  svg {
    margin-left: 2px;
    fill: rgb(151, 151, 176);
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

export default ButtonNavigation;
