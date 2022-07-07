import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../user/models/user.model';
import { USER_MODEL_NAME } from '../constants';
import { MyCtx } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(USER_MODEL_NAME) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext<MyCtx>();
    const token = ctx.req.headers['x-access-token'];
    try {
      if (!token) throw new UnauthorizedException('No token was provided');
      const jwtPayload = this.jwtService.verify(token);
      if (jwtPayload) {
        const authUser = await this.userModel.findOne({
          _id: jwtPayload.userId,
        });
        ctx.user = authUser;
        return true;
      }
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
