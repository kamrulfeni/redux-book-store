export type IErrorPayload = {
  success: boolean;
  message: string;
  errorMessages: [];
  stack?: unknown;
  statusCode?: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
};
export type TLogin = {
  email: string;
  password: string;
};