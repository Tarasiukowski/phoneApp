import { useState } from 'react';

import { Input } from '../../atoms/input/input';

import styles from './ElementFinder.module.scss';
import { props } from './types';

const ElementFinder = ({ renderList }: props) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div className={styles.template}>
      <div className={styles.inputTemplate}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Select for a number"
          autoComplete="off"
        />
      </div>
      <div className={styles.list}>{renderList(inputValue)}</div>
    </div>
  );
};

export default ElementFinder;
