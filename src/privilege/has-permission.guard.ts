import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserPrivilege } from 'src/shared/types';
import { PRIVILAGE_KEY } from 'src/shared/constants';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

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
      const { user } = context.switchToHttp().getRequest();
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