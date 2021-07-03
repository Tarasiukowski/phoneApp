import { RefObject, useEffect } from 'react';

type CallbackType = () => void;
type Settings = { isListeningForEvent?: boolean };
type GetExtraOption = (target: HTMLElement, defaultOption: boolean) => boolean;

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  cb: CallbackType,
  getExtraOption: GetExtraOption,
  settings?: Settings,
) => {
  const { isListeningForEvent } = settings
    ? settings
    : ({ isListeningForEvent: false } as const);

  useEffect(() => {
    if (isListeningForEvent) {
      const handleClickEvent = (e: Event) => {
        const target = e.target as HTMLElement;
        const allow = getExtraOption(target, Boolean(ref.current && !ref.current.contains(target)));

        if (allow) {
          cb();
        }
      };

      window.addEventListener('click', handleClickEvent);

      return () => {
        document.removeEventListener('click', handleClickEvent);
      };
    }
  });
};
