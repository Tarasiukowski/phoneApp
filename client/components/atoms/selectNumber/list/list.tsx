import { useRef, MouseEvent, useState, useEffect } from 'react';
import gsap from 'gsap';
import Input from './input/input';
import NumbersList from './numbersList/numbersList';
import { fetchAllNumbers, fetchRecommendedNumbers } from '../../../../utils/fetchNumbers';
import { fetcher } from '../../../../utils/fetcher';
import { propsSelectNumberList } from '../../../../interfaces';
import styles from './list.module.scss';

const List = ({ setOpenList, setNumber }: propsSelectNumberList) => {
  const [activeList, setActiveList] = useState<string | null>('Recommended');
  const [valueDigits, setValueDigits] = useState<string | undefined>('');
  const [recommendedNumbers, setRecommendedNumbers] = useState<string[]>([]);
  const [allNumbers, setAllNumbers] = useState<string[]>([]);

  const refIndicator = useRef<HTMLSpanElement>(null);
  const refTab = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refListItems = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRecommendedNumbers().then((numbers) => {
      setRecommendedNumbers(numbers);
    });
  }, []);

  useEffect(() => {
    if (valueDigits?.length !== 0) {
      fetcher('post', 'generate/allNumbers', {
        filter: valueDigits,
      }).then(({ numbers }) => {
        setAllNumbers(numbers);
      });
    } else {
      fetchAllNumbers().then((data) => {
        setAllNumbers(data);
      });
    }
  }, [valueDigits]);

  const setOverlap = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const tab = refTab.current as HTMLDivElement;
    const { left: leftTarget } = target.getBoundingClientRect();
    const { left: leftTab } = tab?.getBoundingClientRect();

    gsap.set(refIndicator.current, {
      left: `${leftTarget - leftTab}px`,
    });

    if (activeList === 'Recommended') {
      setActiveList(target.textContent);
    } else if (activeList === 'All') {
      setActiveList(target.textContent);
      return;
    }
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
