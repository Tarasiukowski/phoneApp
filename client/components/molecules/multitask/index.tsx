import { useState, useRef, useCallback } from 'react';

import { Button } from 'components/atoms';

import styles from './multitask.module.scss';
import { isCorrectValue } from 'utils';
import { optionsComponent } from './data';
import { useOutsideClick } from 'hooks';
import { props, GroupData, InputHandle } from './types';

const Multitask = ({ name, open, onEnd, onClose, onNext }: props) => {
  const { stages } = optionsComponent.find((option) => option.name === name)!;
  const iterator = stages.entries();
  iterator.next();

  const [inputValue, setInputValue] = useState('');
  const [activeStage, serActiveStage] = useState(stages[0]);
  const [groupData, setGroupData] = useState<GroupData>({ name: null, members: [] });

  const templateRef = useRef<HTMLDivElement>(null);

  const stageIndex = stages.findIndex((stage) => stage.title === activeStage.title);
  const isEnd = stageIndex === stages.length - 1;
  const returnValueOnEnd = name === 'CreateGroup' ? groupData : inputValue;

  const { title, description, inputPlaceholder, inputName, unlimited, textButton } = activeStage;
  const { members = [] } = groupData;

  useOutsideClick(
    templateRef,
    () => {
      resetData();
      onClose();
    },
    (target, defaultOption) => defaultOption && target.id !== name,
    { isListeningForEvent: open },
  );

  const next = useCallback(async () => {
    if (onNext) {
      const allowNextStage = onNext(inputValue, stageIndex);

      if (allowNextStage) {
        const { unlimited } = activeStage;

        if (unlimited) {
          if (name === 'CreateGroup') {
            if (stageIndex) {
              setGroupData({ ...groupData, members: [...members, inputValue] });
            } else {
              setGroupData({ ...groupData, name: inputValue });
            }
          }

          setInputValue('');
          return;
        }

        const { value, done } = iterator.next();
        const nextStage = value[1];

        if (done) {
          const isEnd = await onEnd(returnValueOnEnd);

          isEnd && close();
          return;
        }

        serActiveStage(nextStage);
        setInputValue('');
      }

      return;
    }

    const isEnd = await onEnd(returnValueOnEnd);

    isEnd && close();
  }, [inputValue]);

  const close = useCallback(() => {
    onClose();
    resetData();
  }, [inputValue]);

  const resetData = useCallback(() => {
    setInputValue('');
    setGroupData({ name: null, members: [] });
  }, []);

  const disabeld = {
    constantButton: !isCorrectValue(inputName, inputValue),
    optionalButton: members.length ? false : true,
  };

  const inputHandle: InputHandle = {
    onChange(e) {
      const value = e.target.value;

      setInputValue(value);
    },
    onKeyUp(e) {
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
                onClick={() => {
                  onEnd(returnValueOnEnd);
                  close();
                }}
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
