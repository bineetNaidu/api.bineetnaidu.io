import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IMAGE_MODEL_NAME } from 'src/shared/constants';
import { ImageDocument } from './models/image.model';
import { Model } from 'mongoose';
import {
  CreateImageResponseDto,
  DeleteImageResponseDto,
  ImagesResponseDto,
} from './dto/image.response-dto';
import { ApiRequestType } from 'src/shared/types';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(IMAGE_MODEL_NAME) private imageModel: Model<ImageDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async upload(
    { filename, path, originalname }: Express.Multer.File,
    req: ApiRequestType,
  ): Promise<CreateImageResponseDto> {
    const image = await this.imageModel.create({
      filename,
      url: path,
      name: originalname,
      uploadedBy: req.user._id,
    });
    await image.save();
    return {
      data: image,
      created: image.isNew,
    };
  }

  async getAll(): Promise<ImagesResponseDto> {
    const images = await this.imageModel.find({});
    return {
      data: images,
      success: true,
      length: images.length,
    };
  }

  async delete(filename: string): Promise<DeleteImageResponseDto> {
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
      data: {
        deleted: true,
        deletedImageId: image._id,
      },
    };
  }
}
