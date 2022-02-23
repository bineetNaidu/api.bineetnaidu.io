import { ResponseDto } from 'src/shared/dto/response.dto';
import { Image } from '../models/image.model';

export class ImagesResponseDto extends ResponseDto<Image[]> {
  length: number;
  success: boolean;
}

export class CreateImageResponseDto extends ResponseDto<Image> {
  created: boolean;
}

type DeleteDataType = {
  deleted: true;
  deletedImageId: string;
};

export class DeleteImageResponseDto extends ResponseDto<DeleteDataType> {}
