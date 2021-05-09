import { useEffect, useState, useRef } from 'react';

import { Button } from '../../atoms/button/button';

import styles from './multitask.module.scss';
import { checkInputValue, getAllChildreenOfElement } from '../../../utils';
import { props } from './types';

const Multitask = ({ name, open, onEnd, onClose }: props) => {
  const option = optionsComponent.find((option) => option.name === name);

  if (option) {
    const [inputValue, setInputValue] = useState('');
    const [counterStage, setCounterStage] = useState(0);

    const templateRef = useRef<HTMLDivElement>(null);

    const stages = option.stages;
    const activeStage = stages[counterStage];
    const end = counterStage === stages.length - 1 ? true : false;

    useEffect(() => {
      window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const allowElements = templateRef.current
          ? getAllChildreenOfElement(templateRef.current, true)
          : [];

        console.log(allowElements.includes(target))
 
        if (!allowElements.includes(target) && target.id !== name) {
          setInputValue('');
          onClose();
        }
      });
    });

    const { title, description, inputPlaceholder, inputName } = activeStage;

    const disabled = !checkInputValue(inputName, inputValue);

    const next = () => {
      setCounterStage(counterStage + 1);
      setInputValue('');

      if (end) {
        onEnd();
      }
    };

    if (open) {
      return (
        <div className={styles.template} ref={templateRef}>
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
