import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

import { Button, ImageUser } from '../../../atoms';
import ListOptions from './listOptions';

import { MailSvg, MoreSvg } from '../../../../public/svgs';
import { props } from './types';
import { selectUser } from '../../../../reducers/userReducer';
import styles from './header.module.scss';

const Header = (props: props) => {
  const [openListOptions, setOpenListOptions] = useState(false);

  const { fullname } = useSelector(selectUser);

  const moreOptionsButtonRef = useRef<HTMLButtonElement>(null);
  const listOptionsRef = useRef<HTMLDivElement>(null);

  const { firstname, lastname } = props.fullname ? props.fullname : fullname;

  const setListOptions = () => {
    if (listOptionsRef.current) {
      const moreOptionsButtonCurrent = moreOptionsButtonRef.current as HTMLButtonElement;
      const listOptionsCurrent = listOptionsRef.current as HTMLDivElement;

      const { height, top, x, width } = moreOptionsButtonCurrent.getBoundingClientRect();
      const { width: wdithList } = listOptionsCurrent.getBoundingClientRect();

      gsap.set(listOptionsCurrent, {
        top: height + top + 5,
        left: x - wdithList + width,
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

    return window.removeEventListener('resize', handleOnResize);
  });

  useEffect(() => {
    window.addEventListener('click', handleOnClick);

    setListOptions();
  }, []);

  return (
    <div className={styles.header}>
      <ImageUser member={props} extraStyle={{ size: '80px', fontSize: '2.5rem' }} />
      <p className={styles.name}>
        {firstname} {lastname}
      </p>
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
      <ListOptions open={openListOptions} listOptionsRef={listOptionsRef} />
    </div>
  );
};

export default Header;
