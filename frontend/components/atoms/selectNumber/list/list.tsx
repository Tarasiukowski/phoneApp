import { useRef, MouseEvent, useState, useEffect } from 'react';
import gsap from 'gsap';
import Input from './input/input';
import { fetchAllNumbers, fetchRecommendedNumbers } from '../../../../utils/fetchNumbers';
import { propsSelectNumberList } from '../../../../interfaces';
import styles from './list.module.scss';
import axios from 'axios';
import NumbersList from './numbersList/numbersList';

const List = ({ setOpenList, setNumber }: propsSelectNumberList) => {
  const [activeList, setActiveList] = useState<string | null>('Recommended');
  const [valueDigits, setValueDigits] = useState<string | undefined>('');
  const [recommendedNumbers, setRecommendedNumbers] = useState<string[]>([]);
  const [allNumbers, setAllNumbers] = useState<string[]>([]);
  //   const [lastNumber, setLastNumber] = useState<string | null>(null);

  const refIndicator = useRef<HTMLSpanElement>(null);
  const refTab = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refListItems = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRecommendedNumbers().then((numbers) => {
      setRecommendedNumbers(numbers);
    });
  }, []);

  //   useEffect(() => {
  //     setLastNumber(allNumbers[allNumbers.length - 1]);
  //   }, [allNumbers]);

  useEffect(() => {
    if (valueDigits?.length !== 0) {
      axios
        .post('http://localhost:7000/generate/allNumbers', {
          filter: valueDigits,
        })
        .then(({ data: { numbers } }) => {
          setAllNumbers(numbers);
        });
    } else {
      fetchAllNumbers().then((data) => {
        setAllNumbers(data);
      });
    }
  }, [valueDigits]);

  //   useEffect(() => {
  //     if (activeList === 'All') {
  //       refListItems.current?.addEventListener('scroll', (e) => {
  //         const scrollHeight = refListItems.current ? refListItems.current.scrollHeight : 0;
  //         const heightListItems = refListItems.current
  //           ? refListItems.current?.getBoundingClientRect().height
  //           : 0;
  //         const target = e.target as HTMLDivElement;

  //         if (scrollHeight - target.scrollTop === heightListItems) {
  //           console.log('req')
  //           axios
  //             .post('http://localhost:7000/generate/allNumbers', {
  //               lastNumber,
  //               filter: valueDigits,
  //             })
  //             .then(({ data }) => {
  //               setAllNumbers([...allNumbers, ...data.numbers]);
  //               console.log(lastNumber)
  //             });
  //         }
  //       });
  //     }
  //   });

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
        className={`${styles.content} ${
          activeList === 'All' ? styles.all : styles.recommended
        }`}
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
            <NumbersList numbers={recommendedNumbers} setNumber={setNumber} />
          ) : (
            <NumbersList numbers={allNumbers} setNumber={setNumber} />
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
