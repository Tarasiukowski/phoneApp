export type props = {
  auth: 'login' | 'singup';
  onSubmit: (msg?: string) => boolean;
};

export type formData = {
  email: String;
};
