import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleOnChange = (
  e: ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>,
) => {
  setValue(e.target.value);
};