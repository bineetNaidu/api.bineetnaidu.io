import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from 'src/cloudinary/cloudinary.provider';
import { IMAGE_MODEL_NAME } from 'src/shared/constants';
import { ImageSchema } from './models/image.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IMAGE_MODEL_NAME, schema: ImageSchema },
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
