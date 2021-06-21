export type props = {
  auth: 'login' | 'singup';
  onSubmit: (msg?: string) => void;
};

export type formData = {
  email: String;
};
