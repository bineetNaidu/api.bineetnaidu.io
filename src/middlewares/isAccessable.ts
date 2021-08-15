import { Request, Response, NextFunction } from 'express';
import NotAuthorizedError from '../utils/errors/NotAuthorizedError';

const isAccessable = (req: Request, _res: Response, next: NextFunction) => {
  if (req.query.accessKey !== process.env.ACCESS_KEY) {
    throw new NotAuthorizedError();
  }
  next();
};

export default isAccessable;
