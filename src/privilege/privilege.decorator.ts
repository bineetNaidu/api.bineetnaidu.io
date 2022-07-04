import { SetMetadata } from '@nestjs/common';
import { PRIVILAGE_KEY } from '../shared/constants';
import { UserPrivilege } from '../shared/types';

export const RequirePrevilages = (...privileges: UserPrivilege[]) =>
  SetMetadata(PRIVILAGE_KEY, privileges);
