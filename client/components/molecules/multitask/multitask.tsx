import { useEffect, useState, useRef } from 'react';

import { Button } from '../../atoms';

import styles from './multitask.module.scss';
import { isCorrectValue, getAllChildreenOfElement } from '../../../utils';
import { optionsComponent } from './data';
import { props } from './types';

const Multitask = ({ name, open, onEnd, onClose, onNext }: props) => {
  const option = optionsComponent.find((option) => option.name === name);

  if (option) {
    const [inputValue, setInputValue] = useState('');
    const [counterStage, setCounterStage] = useState(0);

    const templateRef = useRef<HTMLDivElement>(null);

    const stages = option.stages;
    const activeStage = stages[counterStage];
    const end = counterStage === stages.length - 1 ? true : false;

    useEffect(() => {
      const handleClickEvent = (e: Event) => {
        const target = e.target as HTMLElement;
        const allowElements = templateRef.current
          ? getAllChildreenOfElement(templateRef.current, true)
          : [];

        if (!allowElements.includes(target) && target.id !== name) {
          setInputValue('');
          setCounterStage(0);
          onClose();
        }
      };

      window.addEventListener('click', handleClickEvent);
    });

    const { title, description, inputPlaceholder, inputName } = activeStage;

    const nameInput = inputName as 'code' | 'email';

    const disabled = !isCorrectValue(nameInput, inputValue);

    const next = async () => {
      if (end) {
        const verifyCode = await onEnd(inputValue);
        if (verifyCode) {
          onClose(verifyCode);
          setInputValue('');
          setCounterStage(0);
        }
        return;
      }

      const allowNextStage = onNext ? await onNext(inputValue) : name === 'InviteFriend';

      if (allowNextStage) {
        setCounterStage(counterStage + 1);
        setInputValue('');
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
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    next();
                  }
                }}
                placeholder={inputPlaceholder}
                name={inputName}
                autoComplete="off"
              />
            </div>
            <div className={styles.footer}>
              <Button onClick={next} disabled={disabled} width="auto">
                {end ? (name === 'InviteFriend' ? 'Send' : 'Ok') : 'Next'}
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

export default Multitask;
