import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// import gsap from 'gsap';

import { Button, ImageUser } from '../../../atoms';

import { MailSvg, MoreSvg } from '../../../../public/svgs';
import { props } from './types';
import { selectUser } from '../../../../reducers/userReducer';
import styles from './header.module.scss';

const Header = (props: props) => {
  const { fullname } = useSelector(selectUser);

  const moreOptionsButtonRef = useRef<HTMLButtonElement>(null);
  //   const listOptionsRef = useRef<HTMLDivElement>(null);

  const { firstname, lastname } = props.fullname ? props.fullname : fullname;

  const setListOptions = () => {
    // const moreOptionsButtonCurrent = moreOptionsButtonRef.current as HTMLButtonElement;
    // const listOptionsCurrent = listOptionsRef.current as HTMLDivElement;
    // const { height, top, left } = moreOptionsButtonCurrent.getBoundingClientRect();
    // const { width: wdithList } = listOptionsCurrent.getBoundingClientRect();
    // gsap.set(listOptionsCurrent, {
    //   top: height + top + 5,
    //   left: left - wdithList / 2 - 5,
    // });
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setListOptions();
    });
  });

  useEffect(() => {
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
        <Button width="auto" ref={moreOptionsButtonRef}>
          <MoreSvg />
        </Button>
      </div>
    </div>
  );
};

export default Header;
