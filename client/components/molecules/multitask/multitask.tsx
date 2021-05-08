import { useState } from 'react';

import { Button } from '../../atoms/button/button';

import styles from './multitask.module.scss';
import { checkInputValue } from '../../../utils';
import { props } from './types';

const Multitask = ({ name, onEnd }: props) => {
  const [inputValue, setInputValue] = useState('');
  const [counterStage, setCounterStage] = useState(0);

  const option = optionsComponent.find((option) => option.name === name);

  if (option) {
    const stages = option.stages;
    const activeStage = stages[counterStage];
    const end = counterStage === stages.length - 1 ? true : false

    const { title, description, inputPlaceholder, inputName } = activeStage;

    const disabled = !checkInputValue(inputName, inputValue)

    const next = () => {
      setCounterStage(counterStage + 1);
      setInputValue('');

      if(end) {
        onEnd()
      }
    };

    return (
      <div className={styles.template}>
        <div className={styles.box}>
          <div className={styles.header}>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
          <div className={styles.inputTemplate}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              name={inputName}
              autoComplete="off"
            />
          </div>
          <div className={styles.footer}>
            <Button onClick={next} disabled={disabled} width="auto">
              {end ? 'Ok' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const optionsComponent = [
  {
    name: 'ChangeEmail',
    stages: [
      {
        title: 'Pass new e-mail',
        description: 'to which the code will be sent',
        inputName: 'email',
        inputPlaceholder: 'Enter an email adress',
      },
      {
        title: 'Pass verify code',
        description: 'to which send to your e-mail',
        inputName: 'code',
        inputPlaceholder: 'Enter an verify code',
      },
    ],
  },
];

export default Multitask;
