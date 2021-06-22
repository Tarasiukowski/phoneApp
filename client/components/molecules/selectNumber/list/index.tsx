import {
  useRef,
  MouseEvent,
  useState,
  useEffect,
  ChangeEvent,
  useReducer,
  useContext,
} from 'react';
import gsap from 'gsap';
import { useScroll } from 'react-use';

import Input from './input';
import NumbersList from './numbersList';

import { fetcher, handleNotAllowedError } from '../../../../utils';
import { props, Numbers } from '../types';
import { ErrorContext } from '../../../../contexts';
import styles from './list.module.scss';

const MAX_LENGHT_NUMBER = 8;

const SelectNumberList = ({ onSelectNumber, onClose }: props) => {
  const [activeList, setActiveList] = useState<'Recommended' | 'All'>('Recommended');
  const [valueDigits, setValueDigits] = useState('');
  const [numbers, setNumbers] = useReducer(
    (prevState: Numbers, state: Numbers) => ({ ...prevState, ...state }),
    { all: [], recommended: [] },
  );

  const refIndicator = useRef<HTMLSpanElement>(null);
  const refTab = useRef<HTMLDivElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refListItems = useRef<HTMLDivElement>(null);

  const { setError } = useContext(ErrorContext);

  const { y } = useScroll(refListItems);

  const { all, recommended } = numbers;

  const allNumbers = all as string[];
  const recommendedNumbers = recommended as string[];

  const isActiveAllNumbers = activeList === 'All';

  useEffect(() => {
    if (isActiveAllNumbers) {
      const { scrollHeight, clientHeight } = refListItems.current as HTMLDivElement;

      if (scrollHeight - clientHeight === y && y !== 0) {
        fetcher('post', '/generate/allNumbers', {
          filter: valueDigits,
          lastNumber: allNumbers[allNumbers.length - 1],
        })
          .then(({ numbers }) => {
            setNumbers({ all: [...allNumbers, ...numbers] });
          })
          .catch((err) => {
            const { data, status } = err.response;
            const { errorMsg } = data;

            setError({ msg: errorMsg, id: Math.random() });

            handleNotAllowedError(status);
          });
      }
    }
  }, [y]);

  useEffect(() => {
    fetcher('get', '/generate/randomNumbers')
      .then(({ numbers }) => {
        setNumbers({ recommended: numbers });
      })
      .catch((err) => {
        const { data, status } = err.response;
        const { errorMsg } = data;

        setError({ msg: errorMsg, id: Math.random() });

        handleNotAllowedError(status);
      });
  }, []);

  useEffect(() => {
    fetcher('post', '/generate/allNumbers', { filter: valueDigits })
      .then(({ numbers }) => {
        setNumbers({ all: numbers });
      })
      .catch((err) => {
        const { data, status } = err.response;
        const { errorMsg } = data;

        setError({ msg: errorMsg, id: Math.random() });

        handleNotAllowedError(status);
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

    setActiveList(isActiveAllNumbers ? 'Recommended' : 'All');
  };

  const handleValueDigits = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;

    if (value.length === MAX_LENGHT_NUMBER) {
      return;
    }

    setValueDigits(value);
  };

  const hanldeOnSelectNumber = (number: string) => {
    onSelectNumber(number);
    onClose();
  };

  const closeList = (e: MouseEvent<HTMLDivElement>) => {
    if (refWrapper.current === e.target) {
      onClose();
    }
  };

  return (
    <div onClick={closeList} className={styles.wrapper} ref={refWrapper}>
      <div className={`${styles.content} ${isActiveAllNumbers ? styles.all : styles.recommended}`}>
        <div className={styles.tab} ref={refTab}>
          <button onClick={setOverlap} disabled={!isActiveAllNumbers} className={styles.button}>
            Recommended
          </button>
          <button onClick={setOverlap} disabled={isActiveAllNumbers} className={styles.button}>
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
