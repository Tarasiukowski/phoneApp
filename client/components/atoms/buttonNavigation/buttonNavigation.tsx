import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { ButtonNavigation as propsButtonNavigation } from '../../../interfaces';

const LinkTemplate: React.FC<{ href: string }> = ({ children, href }) => (
  <Link href={href}>{children}</Link>
);

const ButtonNavigation = ({
  icon,
  active,
  button,
  href,
  content,
  ...settings
}: propsButtonNavigation) => {
  if (button) {
    const { asPath } = useRouter();

    return (
      <Button
        active={asPath === href || asPath.startsWith(`/${content.toLocaleLowerCase()}`)}
        {...settings}
      >
        {icon} <span>{content}</span>
      </Button>
    );
  }

  return (
    <>
      {href ? (
        <LinkTemplate href={href}>
          <ButtonNavigation button icon={icon} href={href} content={content} {...settings} />
        </LinkTemplate>
      ) : (
        <ButtonNavigation button icon={icon} content={content} {...settings} />
      )}
    </>
  );
};

const Button = styled.button<{
  size?: { width?: string; height?: string };
  iconSettings?: { marginLeft: string };
  active?: boolean;
}>`
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
