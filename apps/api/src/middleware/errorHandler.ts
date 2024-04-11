import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models';

const errorHandler = (err: CustomError, req: Request, resp: Response, next: NextFunction) => {
  const { statusCode, message, stack } = err;

  console.log(stack);
  resp.status(statusCode || 500).json({ error: message });
};

export default errorHandler;
