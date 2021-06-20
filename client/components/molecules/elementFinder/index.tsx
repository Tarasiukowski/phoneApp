import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '../../atoms';

import styles from './ElementFinder.module.scss';
import { props } from './types';

const ElementFinder = <T,>({ renderItem, data, filterKey, notFound, placeholder }: props<T>) => {
  const [receivedDate, setReceivedDate] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setReceivedDate(data);
  }, [data]);

  useEffect(() => {
    if (inputValue.length) {
      const filteredData = data.filter((elem) => {
        let filterValue: any = elem[filterKey];

        typeof filterValue === 'object' && (filterValue = Object.values(filterValue).join(' '));

        if (filterValue.toLowerCase().startsWith(inputValue.toLowerCase())) {
          return elem;
        }
      });

      setReceivedDate(filteredData);
    } else {
      setReceivedDate(data);
    }
  }, [inputValue]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const renderList = () => receivedDate.map((friend) => renderItem(friend));

  return (
    <div className={styles.template}>
      <div className={styles.inputTemplate}>
        <Input
          value={inputValue}
          onChange={handleOnChange}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
      <div className={styles.list}>
        {receivedDate.length ? renderList() : <p className={styles.info}>{notFound}</p>}
      </div>
    </div>
  );
};

export { ElementFinder };
