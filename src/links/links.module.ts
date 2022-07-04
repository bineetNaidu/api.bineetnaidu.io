import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JWT_SECRET,
  LINKS_MODEL_NAME,
  USER_MODEL_NAME,
} from '../shared/constants';
import { UserSchema } from '../user/models/user.model';
import { LinksResolver } from './links.resolver';
import { LinksService } from './links.service';
import { LinkSchema } from './model/links.model';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([
      { name: LINKS_MODEL_NAME, schema: LinkSchema },
      { name: USER_MODEL_NAME, schema: UserSchema },
    ]),
  ],
  providers: [LinksService, LinksResolver],
})
export class LinksModule {}
