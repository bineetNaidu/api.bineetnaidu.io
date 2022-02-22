import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getAll() {
    return await this.imagesService.getAll();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() image: Express.Multer.File) {
    console.log(image);
    return await this.imagesService.upload(image);
  }

  @Delete('/:filename')
  async delete(@Param('filename') filename: string) {
    return await this.imagesService.delete(filename);
  }
}
