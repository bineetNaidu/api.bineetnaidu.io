import { Request, Response, NextFunction } from 'express';

const isAccessable = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.accessKey !== process.env.ACCESS_KEY) {
    throw new Error('Access Denied!');
  }
  next();
};

export default isAccessable;
