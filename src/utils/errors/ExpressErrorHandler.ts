import { NextFunction, Response, Request } from 'express';
import CustomError from './CustomError';

const ExpressErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res.status(400).json({
    errors: [{ message: err.message || 'Something went Wrong' }],
  });
};

export default ExpressErrorHandler;
