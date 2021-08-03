import {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import { useMemo } from 'react';
import gsap from 'gsap';
import { useScroll } from 'react-use';

import Input from './input';
import NumbersList from './numbersList';

import { handleRequestError, getAllNumbers, getRandomNumbers } from 'utils';
import { props } from '../types';
import { useError } from 'contexts';
import styles from './list.module.scss';
import { ActiveList, Numbers } from './types';
import { useDidMount } from 'hooks';

const LENGTH_NUMBER = 8;

const SelectNumberList = ({ onSelectNumber, onClose }: props) => {
  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.Recommended);
  const [valueDigits, setValueDigits] = useState('');
  const [numbers, setNumbers] = useState<Numbers>({ all: [], recommended: [] });

  const refIndicator = useRef<HTMLSpanElement>(null);
  const refTab = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refListItems = useRef<HTMLDivElement>(null);

  const { setError } = useError();

  const { y } = useScroll(refListItems);
  const { all = [], recommended = [] } = numbers;

  const allNumbers = all;
  const recommendedNumbers = recommended;

  useDidMount(() => {
    getRandomNumbers()
      .then(({ numbers: fetchedNumbers }) => {
        setNumbers({ ...numbers, recommended: fetchedNumbers });
      })
      .catch((err) => {
        handleRequestError(err, (errorMsg) => {
          setError({ msg: errorMsg, id: Math.random() });
        });
      });
  });

  useEffect(() => {
    getAllNumbers({ include: valueDigits })
      .then(({ numbers: fetchedNumbers }) => {
        setNumbers((numbers) => ({ ...numbers, all: fetchedNumbers }));
      })
      .catch((err) => {
        handleRequestError(err, (errorMsg) => {
          setError({ msg: errorMsg, id: Math.random() });
        });
      });
  }, [valueDigits]);

  useEffect(() => {
    if (isActiveAllNumbers) {
      const { scrollHeight, clientHeight } = refListItems.current as HTMLDivElement;

      if (scrollHeight - clientHeight === y && y !== 0) {
        getAllNumbers({
          include: valueDigits,
          startWith: allNumbers[allNumbers.length - 1],
        })
          .then(({ numbers: fetchedNumbers }) => {
            setNumbers({ ...numbers, all: [...allNumbers, ...fetchedNumbers] });
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
    const listItems = refListItems.current as HTMLDivElement;

    listItems.scrollTo(0, 0);
  }, [activeList]);

  const isActiveAllNumbers = activeList === ActiveList.All;

  const disabledButton = useMemo(
    () => ({
      recommended: !isActiveAllNumbers,
      all: isActiveAllNumbers,
    }),
    [isActiveAllNumbers],
  );

  const setOverlap: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const target = e.target as HTMLButtonElement;
      const tab = refTab.current as HTMLDivElement;
      const { left: leftTarget } = target.getBoundingClientRect();
      const { left: leftTab } = tab?.getBoundingClientRect();

      gsap.set(refIndicator.current, {
        left: `${leftTarget - leftTab}px`,
      });

      const oppositeValue = isActiveAllNumbers ? ActiveList.Recommended : ActiveList.All;

      setActiveList(oppositeValue);
    },
    [isActiveAllNumbers],
  );

  const handleValueDigits: ChangeEventHandler<Element> = useCallback((e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (value.length === LENGTH_NUMBER) return;

    setValueDigits(value);
  }, []);

  const hanldeOnSelectNumber = useCallback((number: string) => {
    onSelectNumber(number);
    onClose();
  }, []);

  const closeList: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
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
