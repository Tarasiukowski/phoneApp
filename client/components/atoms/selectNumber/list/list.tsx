import { useRef, MouseEvent, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useScroll } from 'react-use';

import Input from './input/input';
import NumbersList from './numbersList/numbersList';

import { fetcher } from '../../../../utils';
import { propsSelectList } from '../types';
import styles from './list.module.scss';

const List = ({ setOpenList, setNumber }: propsSelectList) => {
  const [activeList, setActiveList] = useState<string | null>('Recommended');
  const [valueDigits, setValueDigits] = useState<string | undefined>('');
  const [recommendedNumbers, setRecommendedNumbers] = useState<string[]>([]);
  const [allNumbers, setAllNumbers] = useState<string[]>([]);

  const refIndicator = useRef<HTMLSpanElement>(null);
  const refTab = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refListItems = useRef<HTMLDivElement>(null);

  const { y } = useScroll(refListItems);

  useEffect(() => {
    const refListItemsCurrent = refListItems.current;
    const scrollHeight = refListItemsCurrent ? refListItemsCurrent.scrollHeight : 0;
    const clientHeight = refListItemsCurrent ? refListItemsCurrent.clientHeight : 0;

    if (scrollHeight - clientHeight === y && y !== 0) {
      fetcher('post', 'generate/allNumbers', {
        filter: valueDigits,
        lastNumber: allNumbers[allNumbers.length - 1],
      }).then((numbers) => {
        setAllNumbers([...allNumbers, ...numbers]);
      });
    }
  }, [y]);

  useEffect(() => {
    fetcher('get', 'generate/randomNumbers').then((numbers) => {
      setRecommendedNumbers(numbers);
    });
  }, []);

  useEffect(() => {
    fetcher('post', 'generate/allNumbers', { filter: valueDigits }).then((numbers) => {
      setAllNumbers(numbers);
    });
  }, [valueDigits]);

  const setOverlap = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const tab = refTab.current as HTMLDivElement;
    const { left: leftTarget } = target.getBoundingClientRect();
    const { left: leftTab } = tab?.getBoundingClientRect();

    gsap.set(refIndicator.current, {
      left: `${leftTarget - leftTab}px`,
    });

    setActiveList(activeList === 'All' ? 'Recommended' : 'All');
  };

  const handleValueDigits = async (e: MouseEvent) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;

    if (value.length === 8) {
      return;
    }

    setValueDigits(value);
  };

  const closeList = (e: MouseEvent<HTMLDivElement>) => {
    if (refWrapper.current === e.target) {
      setOpenList(false);
    }
  };

  return (
    <div onClick={closeList} className={styles.wrapper} ref={refWrapper}>
      <div
        className={`${styles.content} ${activeList === 'All' ? styles.all : styles.recommended}`}
      >
        <div className={styles.tab} ref={refTab}>
          <button
            onClick={setOverlap}
            disabled={activeList === 'Recommended'}
            className={styles.button}
          >
            Recommended
          </button>
          <button onClick={setOverlap} disabled={activeList === 'All'} className={styles.button}>
            All
          </button>
          <span className={styles.indicator} ref={refIndicator} />
        </div>
        {activeList === 'All' && <Input value={valueDigits} onChange={handleValueDigits} />}
        <div className={styles.listItems} ref={refListItems}>
          {activeList === 'Recommended' ? (
            <NumbersList
              numbers={recommendedNumbers}
              setNumber={setNumber}
              setOpenList={setOpenList}
            />
          ) : (
            <NumbersList numbers={allNumbers} setNumber={setNumber} setOpenList={setOpenList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
