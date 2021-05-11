import { ChangeEvent, Dispatch, SetStateAction } from 'react';

// FIX ME
export const handleOnChange = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>,
) => {
  setValue(e.target.value);
};
