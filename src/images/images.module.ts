import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from 'src/cloudinary/cloudinary.provider';
import {
  IMAGE_MODEL_NAME,
  USER_MODEL_NAME,
  JWT_SECRET,
} from 'src/shared/constants';
import { ImageSchema } from './models/image.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/user/models/user.model';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([
      { name: IMAGE_MODEL_NAME, schema: ImageSchema },
      { name: USER_MODEL_NAME, schema: UserSchema },
    ]),
    CloudinaryModule,
    MulterModule.register({
      storage,
      limits: {
        files: 1,
      },
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
