import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_KEY } from '../constants';

@Injectable()
export class IsAccessableMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.query.accessKey !== ACCESS_KEY) {
      throw new UnauthorizedException();
    }
    next();
  }
}
