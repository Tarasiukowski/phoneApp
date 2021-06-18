import { Dispatch, SetStateAction } from 'react';

export type propsSelectNumberButton = {
  onClick: () => void;
  number: string | null;
  mini?: boolean
};

export type propsSelectList = {
  setOpenList: Dispatch<SetStateAction<boolean>>;
  setNumber: Dispatch<SetStateAction<string | null>>;
};

export type propsSelectNumberItem = {
  number: string;
  onClick: (e: any) => void;
};

export type propsSelectNumberInput = {
  value: string | undefined;
  onChange: (e: any) => void;
};

export type propsSelectNumbersList = {
  numbers: string[];
  setNumber: Dispatch<SetStateAction<string | null>>;
  setOpenList: Dispatch<SetStateAction<boolean>>;
};
