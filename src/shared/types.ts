import { User } from '../user/models/user.model';

export interface MyCtx {
  req: Request;
  res: Response;
  user: User | undefined;
}

export enum UserPrivilege {
  USERS_READ = 'users:read',
  USERS_WRITE = 'users:write',
  LINKS_READ = 'links:read',
  LINKS_WRITE = 'links:write',
  LINKS_DELETE = 'links:delete',
}

export interface Configuration {
  port: number;
  accessKey: string;
  jwtSecret: string;
  environment: string;
  database: {
    uri: string;
    testUri: string;
  };
}
