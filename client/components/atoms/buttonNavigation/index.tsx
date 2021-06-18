import { forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { StyledButton } from './styles';

import { props } from './types';

const Button = forwardRef<HTMLButtonElement, props>(
  ({ icon, active, href, content, ...restProps }, ref) => {
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

export { ButtonNavigation };
