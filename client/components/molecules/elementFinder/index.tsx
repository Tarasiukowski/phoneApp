import { ChangeEventHandler, useEffect, useState } from 'react';
import { filterByKey } from 'utils';

import { Input } from 'components/atoms';

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
      const filteredData = filterByKey(data, inputValue, filterKey);

      setReceivedDate(filteredData);
    } else {
      setReceivedDate(data);
    }
  }, [inputValue]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const renderList = () => receivedDate.map((elem) => renderItem(elem));

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
        {receivedDate?.length ? renderList() : <p className={styles.info}>{notFound}</p>}
      </div>
    </div>
  );
};

export { ElementFinder };
