import { SetMetadata } from '@nestjs/common';
import { PRIVILAGE_KEY } from 'src/shared/constants';
import { UserPrivilege } from 'src/shared/types';

export const RequirePrevilages = (...privileges: UserPrivilege[]) =>
  SetMetadata(PRIVILAGE_KEY, privileges);
