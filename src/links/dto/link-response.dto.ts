import { ResponseDto } from 'src/shared/dto/response.dto';
import { LinkDocument } from '../model/links.model';

export class CreateLinkResponseDto extends ResponseDto<LinkDocument> {
  readonly created: boolean;
}

export class UpdateLinkResponseDto extends ResponseDto<LinkDocument> {
  readonly updated: boolean;
}

export class DeleteLinkResponseDto {
  readonly deleted: boolean;
  readonly deleted_link_id: string;
}

export class FindAllLinksResponseDto extends ResponseDto<LinkDocument[]> {
  readonly success: boolean;
  readonly length: number;
}
