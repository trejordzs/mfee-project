import { CustomError } from '../models';

type CustomErrorProps = {
  statusCode: number;
  message: string;
};

export const customErrorFn = ({ statusCode, message }: CustomErrorProps): CustomError => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  return error;
};
