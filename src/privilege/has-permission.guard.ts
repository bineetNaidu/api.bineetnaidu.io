import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { PRIVILAGE_KEY } from '../shared/constants';
import { MyCtx, UserPrivilege } from '../shared/types';

@Injectable()
export class HasPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPrivilages = this.reflector.getAllAndOverride<
      UserPrivilege[]
    >(PRIVILAGE_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPrivilages) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext<MyCtx>();
    if (!user) {
      throw new UnauthorizedException('You need to logged in to access this');
    }
    return requiredPrivilages.some((role) => user.privileges.includes(role));
  }
}
