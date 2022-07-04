import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { PRIVILAGE_KEY } from '../shared/constants';
import { ApiRequestType, UserPrivilege } from '../shared/types';

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

    if (context.getType() === 'http') {
      const { user } = context.switchToHttp().getRequest<ApiRequestType>();
      if (!user) {
        return false;
      }
      return requiredPrivilages.some((role) => user.privileges.includes(role));
    }
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      if (!req.user) {
        return false;
      }
      return requiredPrivilages.some((role) =>
        req.user.privileges.includes(role),
      );
    }
  }
}
