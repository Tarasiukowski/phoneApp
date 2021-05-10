export type props = {
  name: "ChangeEmail";
  open: boolean
  onEnd: (inputValue: string) => void;
  onClose: () => void;
  onNext: (inputValue: string) => void
}