import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { Button, ImageUser } from 'components/atoms';
import ListOptions from './listOptions';

import { MailSvg, MoreSvg } from '../../../../public/svgs';
import { props } from './types';
import { useUser } from 'hooks';
import styles from './header.module.scss';

const Header = (props: props) => {
  const [openListOptions, setOpenListOptions] = useState(false);

  const loggedUser = useUser();

  const moreOptionsButtonRef = useRef<HTMLButtonElement>(null);
  const listOptionsRef = useRef<HTMLDivElement>(null);

  const userData = {
    ...props,
    fullname: props.fullname ? props.fullname : loggedUser?.fullname,
  };

  const { fullname, email } = userData;

  const formatedFullname = fullname ? Object.values(fullname).join(' ') : null;

  const setListOptions = () => {
    if (listOptionsRef.current) {
      const moreOptionsButtonCurrent = moreOptionsButtonRef.current as HTMLButtonElement;
      const listOptionsCurrent = listOptionsRef.current as HTMLDivElement;

      const {
        height: heightButton,
        top: buttonTop,
        x: buttonX,
        width: buttonWidth,
      } = moreOptionsButtonCurrent.getBoundingClientRect();
      const { width: wdithList } = listOptionsCurrent.getBoundingClientRect();

      gsap.set(listOptionsCurrent, {
        top: heightButton + buttonTop + 5,
        left: buttonX - wdithList + buttonWidth,
      });
    }
  };

  const handleOnResize = () => {
    setListOptions();
  };

  const handleOnClick = (e: Event) => {
    const target = e.target;

    if (moreOptionsButtonRef.current !== target) {
      setOpenListOptions(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleOnResize);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleOnClick);

    setListOptions();
  }, []);

  return (
    <div className={styles.header}>
      <ImageUser member={props} extraStyle={{ size: '80px', fontSize: '2.5rem' }} />
      <p className={styles.name}>{formatedFullname}</p>
      <div className={styles.options}>
        <Button width="auto">
          <MailSvg />
        </Button>
        <Button
          onClick={() => {
            setOpenListOptions(!openListOptions);
          }}
          width="auto"
          ref={moreOptionsButtonRef}
        >
          <MoreSvg />
        </Button>
      </div>
      <ListOptions open={openListOptions} email={email} listOptionsRef={listOptionsRef} />
    </div>
  );
};

export default Header;
