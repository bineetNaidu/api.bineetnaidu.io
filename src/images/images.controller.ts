import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ImagesService } from './images.service';
import {
  CreateImageResponseDto,
  DeleteImageResponseDto,
  ImagesResponseDto,
} from './dto/image.response-dto';
import { ApiRequestType, UserPrivilege } from 'src/shared/types';
import { RequirePrevilages } from 'src/privilege/privilege.decorator';
import { HasPermissionGuard } from 'src/privilege/has-permission.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @UseGuards(AuthGuard)
  @RequirePrevilages(UserPrivilege.IMAGES_READ)
  @UseGuards(HasPermissionGuard)
  async getAll(): Promise<ImagesResponseDto> {
    return this.imagesService.getAll();
  }

  @Post('/upload')
  @UseGuards(AuthGuard)
  @RequirePrevilages(UserPrivilege.IMAGES_WRITE)
  @UseGuards(HasPermissionGuard)
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @Req() req: ApiRequestType,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<CreateImageResponseDto> {
    console.log(image);
    return await this.imagesService.upload(image, req);
  }

  @Delete('/:filename')
  @UseGuards(AuthGuard)
  @RequirePrevilages(UserPrivilege.IMAGES_DELETE)
  @UseGuards(HasPermissionGuard)
  async delete(
    @Param('filename') filename: string,
  ): Promise<DeleteImageResponseDto> {
    return await this.imagesService.delete(filename);
  }
}
