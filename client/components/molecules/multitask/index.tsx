import { useEffect, useState, useRef, useReducer, ChangeEvent, KeyboardEvent } from 'react';

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
    const isEnd = counterStage === stages.length - 1 ? true : false;

    useEffect(() => {
      if (open) {
        const handleClickEvent = (e: Event) => {
          const target = e.target as HTMLElement;
          const allowElements = templateRef.current
            ? getAllChildreenOfElement(templateRef.current, true)
            : [];

          if (!allowElements.includes(target) && target.id !== name) {
            setInputValue('');
            setCounterStage(0);
            setGroupData({ name: null, members: [] });
            onClose();
          }
        };

        window.addEventListener('click', handleClickEvent);
      }
    });

    const { title, description, inputPlaceholder, inputName, unlimited, textButton } = activeStage;

    const members = groupData.members as string[];

    const isDisabled = !isCorrectValue(inputName, inputValue);

    const inputHandle = {
      onChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setInputValue(value);
      },
      onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
          if (!isDisabled) {
            next();
          }
        }
      },
    };

    const next = async () => {
      if (isEnd && !unlimited) {
        const allowResetData = await onEnd(inputValue);

        if (allowResetData) {
          onClose(allowResetData);
          setInputValue('');
          setCounterStage(0);
        }
        return;
      }

      const allowNextStage =
        (onNext ? await onNext(inputValue, counterStage) : false) && Boolean(stages.length);

      if (allowNextStage) {
        unlimited || setCounterStage(counterStage + 1);

        const { members } = groupData;

        name === 'CreateGroup' && counterStage > 0
          ? setGroupData({ members: members ? [...members, inputValue] : [inputValue] })
          : setGroupData({ name: inputValue });
      }

      allowNextStage && setInputValue('');
    };

    const end = () => {
      onEnd(groupData);
      onClose();
      setGroupData({ name: null, members: [] });
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
                placeholder={inputPlaceholder}
                name={inputName}
                autoComplete="off"
                {...inputHandle}
              />
            </div>
            <div className={styles.footer}>
              <Button onClick={next} disabled={isDisabled} width="auto">
                {isEnd ? textButton : 'Next'}
              </Button>
              {unlimited && (
                <Button
                  onClick={end}
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
