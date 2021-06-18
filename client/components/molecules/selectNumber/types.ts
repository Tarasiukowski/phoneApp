export type propsSelectNumberButton = {
  onClick: () => void;
  number: string | null;
  mini?: boolean;
};

export type propsSelectList = {
  onSelectNumber: (number: string) => void;
  onClose: () => void;
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
  onSelectNumber: (number: string) => void;
};
