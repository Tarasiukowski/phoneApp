import { useState, useRef, useReducer, ChangeEvent, KeyboardEvent, useCallback } from 'react';

import { Button } from 'components/atoms';

import styles from './multitask.module.scss';
import { isCorrectValue } from 'utils';
import { optionsComponent } from './data';
import { useOutsideClick } from 'hooks';
import { props, GroupData } from './types';

const Multitask = ({ name, open, onEnd, onClose, onNext }: props) => {
  const option = optionsComponent.find((option) => option.name === name)!;

  const [inputValue, setInputValue] = useState('');
  const [counterStage, setCounterStage] = useState(0);
  const [groupData, setGroupData] = useReducer(
    (prevState: GroupData, state: GroupData) => ({ ...prevState, ...state }),
    { name: null, members: [] },
  );

  const templateRef = useRef<HTMLDivElement>(null);

  const stages = option.stages;
  const activeStage = stages[counterStage];
  const isEnd = counterStage === stages.length - 1;

  useOutsideClick(
    templateRef,
    () => {
      resetData();
      onClose();
    },
    (target, defaultOption) => defaultOption && target.id !== name,
    { isListeningForEvent: open },
  );

  const resetData = () => {
    setInputValue('');
    setCounterStage(0);
    setGroupData({ name: null, members: [] });
  };

  const next = useCallback(async () => {
    if (isEnd && !unlimited) {
      const allowResetData = await onEnd(inputValue);

      if (allowResetData) {
        onClose(allowResetData);
        setCounterStage(0);
      }

      return;
    }

    const allowNextStage =
      (onNext ? await onNext(inputValue, counterStage) : false) && Boolean(stages.length);

    if (allowNextStage) {
      unlimited || setCounterStage(counterStage + 1);

      const { members = [] } = groupData;

      name === 'CreateGroup' && counterStage > 0
        ? setGroupData({ members: [...members, inputValue] })
        : setGroupData({ name: inputValue });
    }

    allowNextStage && setInputValue('');
  }, [inputValue]);

  const end = useCallback(() => {
    onEnd(groupData);
    onClose();
    setGroupData({ name: null, members: [] });
  }, [inputValue]);

  const { title, description, inputPlaceholder, inputName, unlimited, textButton } = activeStage;

  const { members = [] } = groupData;

  const disabeld = {
    constantButton: !isCorrectValue(inputName, inputValue),
    optionalButton: members.length ? false : true,
  };

  const inputHandle = {
    onChange(e: ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;

      setInputValue(value);
    },
    onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
        if (!disabeld.constantButton) {
          next();
        }
      }
    },
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
              key={counterStage}
              value={inputValue}
              placeholder={inputPlaceholder}
              name={inputName}
              autoComplete="off"
              {...inputHandle}
            />
          </div>
          <div className={styles.footer}>
            <Button onClick={next} disabled={disabeld.constantButton} width="auto">
              {isEnd ? textButton : 'Next'}
            </Button>
            {unlimited && (
              <Button
                onClick={end}
                disabled={disabeld.optionalButton}
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
};

export { Multitask };
