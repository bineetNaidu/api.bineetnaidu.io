import { User } from '../user/models/user.model';

export interface MyCtx {
  req: Request;
  res: Response;
  user: User | undefined;
}

export enum UserPrivilege {
  IMAGES_READ = 'images:read',
  IMAGES_WRITE = 'images:write',
  IMAGES_DELETE = 'images:delete',
  PROJECTS_READ = 'projects:read',
  PROJECTS_WRITE = 'projects:write',
  PROJECTS_DELETE = 'projects:delete',
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
