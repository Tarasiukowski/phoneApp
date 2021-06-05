import { useEffect, useState, useRef, useReducer } from 'react';

import { Button } from '../../atoms';

import styles from './multitask.module.scss';
import { isCorrectValue, getAllChildreenOfElement } from '../../../utils';
import { optionsComponent } from './data';
import { props, GroupData } from './types';

const Multitask = ({ name, open, onEnd, onClose, onNext }: props) => {
  const option = optionsComponent.find((option) => option.name === name);

  if (option) {
    const [inputValue, setInputValue] = useState('');
    const [counterStage, setCounterStage] = useState(0);
    const [groupData, setGroupData] = useReducer(
      (prevState: GroupData, state: GroupData) => ({ ...prevState, ...state }),
      { name: null, members: [] },
    );

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

    const { title, description, inputPlaceholder, inputName, unlimited } = activeStage;

    const members = groupData.members as string[];

    const disabled = !isCorrectValue(inputName, inputValue);

    const next = async () => {
      if (end && !unlimited) {
        const allowResetData = await onEnd(inputValue);
        if (allowResetData) {
          onClose(allowResetData);
          setInputValue('');
          setCounterStage(0);
        }
        return;
      }

      const allowNextStage =
        (onNext ? await onNext(inputValue) : false) &&
        (stages.length > 1 ? true : false) &&
        !unlimited;

      if (allowNextStage) {
        setCounterStage(counterStage + 1);
      }

      const { members } = groupData;

      name === 'CreateGroup' && counterStage > 0
        ? setGroupData({ members: members ? [...members, inputValue] : [inputValue] })
        : setGroupData({ name: inputValue });

      setInputValue('');
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
                    if (!disabled) {
                      next();
                    }
                  }
                }}
                placeholder={inputPlaceholder}
                name={inputName}
                autoComplete="off"
              />
            </div>
            <div className={styles.footer}>
              <Button onClick={next} disabled={disabled} width="auto">
                {end
                  ? name === 'InviteFriend'
                    ? 'Send'
                    : name === 'CreateGroup'
                    ? 'Add'
                    : 'Ok'
                  : 'Next'}
              </Button>
              {unlimited && (
                <Button
                  onClick={() => {
                    onEnd(groupData);
                    onClose();
                    setGroupData({ name: null, members: [] });
                  }}
                  disabled={members.length ? false : true}
                  width="auto"
                  style={{ marginLeft: '10px' }}
                >
                  Create
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  return null;
};

export { Multitask };
