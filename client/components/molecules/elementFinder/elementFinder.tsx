import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '../../atoms/input/input';

import styles from './ElementFinder.module.scss';
import { props } from './types';

const ElementFinder = <T,>({ renderList, data, filterKey, info }: props<T>) => {
  const [getData, setGetData] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    setGetData(data)
  }, [data]);

  useEffect(() => {
    if (inputValue.length) {
      const filteredData = data.filter((elem) => {
        let filterValue: any = elem[filterKey];

        typeof filterValue === 'object'
          ? (filterValue = Object.values(filterValue).join(' '))
          : null;

        if (filterValue.toLowerCase().startsWith(inputValue.toLowerCase())) {
          return elem;
        }
      });

      setGetData(filteredData);
    } else {
      setGetData(data);
    }
  }, [inputValue]);

  return (
    <div className={styles.template}>
      <div className={styles.inputTemplate}>
        <Input
          value={inputValue}
          onChange={handleOnChange}
          placeholder="Select for a number"
          autoComplete="off"
        />
      </div>
      <div className={styles.list}>
        {getData.length ? renderList(getData) : <p className={styles.info}>{info}</p>}
      </div>
    </div>
  );
};

export default ElementFinder;
