import { User } from '../user/models/user.model';

export type ApiRequestType = Request & {
  user: User | undefined;
};
export interface MyCtx {
  req: ApiRequestType;
  res: Response;
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
