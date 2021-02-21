import { useRef, MouseEvent, useState } from 'react';
import gsap from 'gsap';
import Item from './item/item';
import Input from './input/input';
import styles from './list.module.scss';
import { propsSelectNumberList } from '../../../../interfaces';

const List = ({ setOpenList }: propsSelectNumberList) => {
  const [activeList, setActiveList] = useState<string | null>('Recommended');

  const refIndicator = useRef<HTMLSpanElement>(null);
  const refTab = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);

  const setOverlap = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const tab = refTab.current as HTMLDivElement;
    const { left: leftTarget } = target.getBoundingClientRect();
    const { left: leftTab } = tab?.getBoundingClientRect();

    setActiveList(target.textContent);

    gsap.set(refIndicator.current, {
      left: `${leftTarget - leftTab}px`,
    });
  };

  const closeList = (e: MouseEvent<HTMLDivElement>) => {
    if (refWrapper.current === e.target) {
      setOpenList(false);
    }
  };

  return (
    <div onClick={closeList} className={styles.wrapper} ref={refWrapper}>
      <div className={styles.content}>
        <div className={styles.tab} ref={refTab}>
          <button onClick={setOverlap} className={styles.button}>
            Recommended
          </button>
          <button onClick={setOverlap} className={styles.button}>
            All
          </button>=
          <span className={styles.indicator} ref={refIndicator} />
        </div>
        {activeList === 'All' && <Input />}
        <div className={styles.listItems}>
          {activeList === 'Recommended' ? <Item number="836-9876" /> : <Item number="876-9876" />}
        </div>
      </div>
    </div>
  );
};

export default List;
