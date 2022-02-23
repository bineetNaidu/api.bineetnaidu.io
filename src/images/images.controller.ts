import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ImagesService } from './images.service';
import {
  CreateImageResponseDto,
  DeleteImageResponseDto,
  ImagesResponseDto,
} from './dto/image.response-dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<ImagesResponseDto> {
    return this.imagesService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<CreateImageResponseDto> {
    console.log(image);
    return await this.imagesService.upload(image);
  }

  @UseGuards(AuthGuard)
  @Delete('/:filename')
  async delete(
    @Param('filename') filename: string,
  ): Promise<DeleteImageResponseDto> {
    return await this.imagesService.delete(filename);
  }
}
