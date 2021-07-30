import { useRef, MouseEvent, useState, useEffect, ChangeEvent, useCallback } from 'react';
import gsap from 'gsap';
import { useScroll } from 'react-use';

import Input from './input';
import NumbersList from './numbersList';

import { handleRequestError, getAllNumbers, getRandomNumbers } from 'utils';
import { props } from '../types';
import { useError } from 'contexts';
import styles from './list.module.scss';
import { ActiveList } from './types';
import { useDidMount } from 'hooks';

const MAX_LENGTH_NUMBER = 8;

const SelectNumberList = ({ onSelectNumber, onClose }: props) => {
  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.Recommended);
  const [valueDigits, setValueDigits] = useState('');
  const [numbers, setNumbers] = useState({ all: [], recommended: [] });

  const refIndicator = useRef<HTMLSpanElement>(null);
  const refTab = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refListItems = useRef<HTMLDivElement>(null);

  const { setError } = useError();

  const { y } = useScroll(refListItems);

  useDidMount(() => {
    getRandomNumbers()
      .then(({ numbers }) => {
        setNumbers({ ...numbers, recommended: numbers });
      })
      .catch((err) => {
        handleRequestError(err, (errorMsg) => {
          setError({ msg: errorMsg, id: Math.random() });
        });
      });
  });

  useEffect(() => {
    if (isActiveAllNumbers) {
      const { scrollHeight, clientHeight } = refListItems.current as HTMLDivElement;

      if (scrollHeight - clientHeight === y && y !== 0) {
        getAllNumbers({
          include: valueDigits,
          startWith: allNumbers[allNumbers.length - 1],
        })
          .then(({ numbers }) => {
            setNumbers({ ...numbers, all: [...allNumbers, ...numbers] });
          })
          .catch((err) => {
            handleRequestError(err, (errorMsg) => {
              setError({ msg: errorMsg, id: Math.random() });
            });
          });
      }
    }
  }, [y]);

  useEffect(() => {
    getAllNumbers({ include: valueDigits })
      .then(({ numbers }) => {
        setNumbers({ ...numbers, all: numbers });
      })
      .catch((err) => {
        handleRequestError(err, (errorMsg) => {
          setError({ msg: errorMsg, id: Math.random() });
        });
      });
  }, [valueDigits]);

  useEffect(() => {
    const listItems = refListItems.current as HTMLDivElement;

    listItems.scrollTo(0, 0);
  }, [activeList]);

  const { all = [], recommended = [] } = numbers;

  const allNumbers = all;
  const recommendedNumbers = recommended;

  const isActiveAllNumbers = activeList === ActiveList.All;

  const disabledButton = {
    recommended: !isActiveAllNumbers,
    all: isActiveAllNumbers,
  };

  const setOverlap = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const tab = refTab.current as HTMLDivElement;
    const { left: leftTarget } = target.getBoundingClientRect();
    const { left: leftTab } = tab?.getBoundingClientRect();

    gsap.set(refIndicator.current, {
      left: `${leftTarget - leftTab}px`,
    });

    const oppositeValue = isActiveAllNumbers ? ActiveList.Recommended : ActiveList.All;

    setActiveList(oppositeValue);
  };

  const handleValueDigits = (e: ChangeEvent<Element>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (value.length === MAX_LENGTH_NUMBER) return;

    setValueDigits(value);
  };

  const hanldeOnSelectNumber = useCallback((number: string) => {
    onSelectNumber(number);
    onClose();
  }, []);

  const closeList = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (refWrapper.current === e.target) {
      onClose();
    }
  }, []);

  return (
    <div onClick={closeList} className={styles.wrapper} ref={refWrapper}>
      <div className={`${styles.content} ${isActiveAllNumbers ? styles.all : styles.recommended}`}>
        <div className={styles.tab} ref={refTab}>
          <button
            onClick={setOverlap}
            disabled={disabledButton.recommended}
            className={styles.button}
          >
            Recommended
          </button>
          <button onClick={setOverlap} disabled={disabledButton.all} className={styles.button}>
            All
          </button>
          <span className={styles.indicator} ref={refIndicator} />
        </div>
        {isActiveAllNumbers && <Input value={valueDigits} onChange={handleValueDigits} />}
        <div className={styles.listItems} ref={refListItems}>
          {isActiveAllNumbers ? (
            <NumbersList numbers={allNumbers} onSelectNumber={hanldeOnSelectNumber} />
          ) : (
            <NumbersList numbers={recommendedNumbers} onSelectNumber={hanldeOnSelectNumber} />
          )}
        </div>
      </div>
    </div>
  );
};

export { SelectNumberList };
