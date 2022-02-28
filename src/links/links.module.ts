import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from './model/links.model';
import {
  JWT_SECRET,
  LINKS_MODEL_NAME,
  USER_MODEL_NAME,
} from 'src/shared/constants';
import { LinksResolver } from './links.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/user/models/user.model';

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
  controllers: [LinksController],
  providers: [LinksService, LinksResolver],
})
export class LinksModule {}
