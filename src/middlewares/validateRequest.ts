import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import RequestValidationError from '../utils/errors/RequestValidationError';

const validateRequest = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

export default validateRequest;
