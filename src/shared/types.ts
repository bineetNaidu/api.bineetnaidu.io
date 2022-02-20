import { Request, Response } from '@nestjs/common';
import { User } from '../user/models/user.model';

export interface MyCtx {
  req: Request & {
    user: User | undefined;
  };
  res: Response;
}
