export type props = {
  onSelectNumber: (number: string) => void;
  onClose: () => void;
};

export type Numbers = {
  all?: string[],
  recommended?: string[]
}