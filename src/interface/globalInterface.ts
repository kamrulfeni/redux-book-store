export type IError = {
  success: false;
  errorMessages: [];
  stack?: unknown;
};

export type TResponse<T> = {
  data: T;
  message: string;
  statusCode: number | string;
  success: boolean;
};

export type TApiResponse<T> = {
  message: string;
  statusCode: number;
} & (
  | {
      data: T;
      success: true;
      meta?: {
        page?: number;
        limit?: number;
        total?: number;
      };
    }
  | IError
);

// export type IError = {
//     success: false;
//     message: string;
//     errorMessages: [];
//     stack?: unknown;
//     statusCode?: number;
//   };
