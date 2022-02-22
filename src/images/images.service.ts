import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IMAGE_MODEL_NAME } from 'src/shared/constants';
import { ImageDocument } from './models/image.model';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(IMAGE_MODEL_NAME) private imageModel: Model<ImageDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async upload({ filename, path, originalname }: Express.Multer.File) {
    const image = await this.imageModel.create({
      filename,
      url: path,
      name: originalname,
    });
    await image.save();
    return { image };
  }

  async getAll() {
    const images = await this.imageModel.find({});
    return {
      data: images,
      success: true,
      length: images.length,
    };
  }

  async delete(filename: string) {
    const image = await this.imageModel.findOne({ filename });
    if (!image) {
      throw new BadRequestException({
        message: 'Image not found',
        field: 'filename',
      });
    }
    await this.cloudinaryService.removeImage(image);
    await image.remove();
    return {
      image: {
        deleted: true,
        deletedImageId: image._id,
      },
    };
  }
}
