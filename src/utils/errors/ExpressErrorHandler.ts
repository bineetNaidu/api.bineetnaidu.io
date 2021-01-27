/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import CustomError from './CustomError';

function ExpressErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line comma-dangle
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res.status(400).json({
    errors: [{ message: err.message || 'Something went Wrong' }],
  });
}

export default ExpressErrorHandler;
