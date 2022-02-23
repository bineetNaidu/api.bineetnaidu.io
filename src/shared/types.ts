import { Request, Response } from '@nestjs/common';
import { User } from '../user/models/user.model';

export type ApiRequestType = Request & {
  user: User | undefined;
};
export interface MyCtx {
  req: ApiRequestType;
  res: Response;
}
