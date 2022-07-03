import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/user/models/user.model';
import { USER_MODEL_NAME } from '../constants';
import { Model } from 'mongoose';
import { ApiRequestType } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(USER_MODEL_NAME) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest<ApiRequestType>();
      const token = req.headers['x-access-token'];

      try {
        if (!token) throw new UnauthorizedException('No token was provided');
        const jwtPayload = this.jwtService.verify(token);
        if (jwtPayload) {
          const authUser = await this.userModel.findOne({
            _id: jwtPayload.userId,
          });
          req.user = authUser;
          return true;
        }
      } catch (err) {
        throw new UnauthorizedException(err.message);
      }
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      const token = req.headers['x-access-token'];

      try {
        if (!token) throw new UnauthorizedException('No token was provided');
        const jwtPayload = this.jwtService.verify(token);
        if (jwtPayload) {
          const authUser = await this.userModel.findOne({
            _id: jwtPayload.userId,
          });
          req.user = authUser;
          return true;
        }
      } catch (err) {
        throw new UnauthorizedException(err.message);
      }
    }
  }
}
