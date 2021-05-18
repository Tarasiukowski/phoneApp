import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import styles from './searcher.module.scss';
import { SearchSvg } from '../../../public/svgs/index';
import { getAllChildreenOfElement, getSearcherData } from '../../../utils';
import { props } from './types';

const Searcher = ({ open, onClose }: props) => {
  const [searchData, setSearcherData] = useState<any[]>([]);
  const [inputValue, setValueInput] = useState<string>('');

  const templateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickEvent = (e: Event) => {
      const templateRefCurrent = templateRef.current as HTMLElement;
      const allowElements = templateRef.current ? getAllChildreenOfElement(templateRefCurrent) : [];
      const target = e.target as HTMLElement;

      target.id === 'searcher' ? allowElements.push(target) : null;

      if (!allowElements.includes(target)) {
        onClose();
        setValueInput('');
      }
    };

    window.addEventListener('click', handleClickEvent);
  });

  useEffect(() => {
    const fetchData = getSearcherData();

    setSearcherData(fetchData);
  }, []);

  useEffect(() => {
    if (inputValue.length) {
      const filterData = searchData.filter((elem) => {
        const { filterValue } = elem;

        if (filterValue.startsWith(inputValue)) {
          return elem;
        }
      });

      setSearcherData(filterData);
    } else {
      const fetchData = getSearcherData();

      setSearcherData(fetchData);
    }
  }, [inputValue]);

  const handleClickElement = () => {
    onClose();
    setValueInput('');
  };

  if (open) {
    return (
      <div className={styles.template} ref={templateRef}>
        <div className={styles.box}>
          <div className={styles.inputTemplate}>
            <div>
              <SearchSvg />
            </div>
            <div>
              <input
                value={inputValue}
                onChange={(e) => {
                  setValueInput(e.target.value);
                }}
                type="text"
                placeholder="What are you looking for?..."
              />
            </div>
          </div>
          <div className={styles.lists}>
            {inputValue.length ? (
              searchData.length ? (
                searchData.map(({ value }) => {
                  if (typeof value === 'string') {
                    return (
                      <div onClick={handleClickElement} key={value}>
                        <Link href={value}>
                          <div className={styles.elementList} key={value}>
                            <p>{value}</p>
                          </div>
                        </Link>
                      </div>
                    );
                  }

                  return value.map((val: string) => (
                    <div onClick={handleClickElement} key={val}>
                      <Link href={val}>
                        <div className={styles.elementList} key={val}>
                          <p>{val}</p>
                        </div>
                      </Link>
                    </div>
                  ));
                })
              ) : (
                <p className={styles.info}>Not found</p>
              )
            ) : (
              <p className={styles.info}>I will find what you need for you.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Searcher;
