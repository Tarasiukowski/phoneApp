import { RefObject, useEffect } from 'react';

type CallbackType = () => void;
type Settings = { isListeningForEvent?: boolean };
type GetExtraOption = (target: HTMLElement, defaultOption: boolean) => boolean;

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  cb: CallbackType,
  getExtraOption: GetExtraOption,
  settings: Settings = { isListeningForEvent: false },
) => {
  const { isListeningForEvent } = settings;

  const handleClickEvent = (e: Event) => {
    const target = e.target as HTMLElement;
    const defaultOption = Boolean(ref.current && !ref.current.contains(target));
    const allow = getExtraOption(target, defaultOption);

    if (allow) {
      cb();
    }
  };

  useEffect(() => {
    if (isListeningForEvent) {
      window.addEventListener('click', handleClickEvent);

      return () => {
        document.removeEventListener('click', handleClickEvent);
      };
    }
  });
};
