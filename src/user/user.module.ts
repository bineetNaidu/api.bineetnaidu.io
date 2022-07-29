import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from '../config/configuration';
import { USER_MODEL_NAME } from '../shared/constants';
import { UserSchema } from './models/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: UserSchema }]),
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
