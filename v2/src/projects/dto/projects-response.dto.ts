import { ResponseDto } from '../../shared/dto/response.dto';
import { ProjectDocument } from '../model/projects.model';

export class CreateProjectResponseDto extends ResponseDto<ProjectDocument> {
  created: boolean;
  success: boolean;
}

export class FindAllProjectsResponseDto extends ResponseDto<ProjectDocument[]> {
  success: boolean;
  length: number;
}

export class FindOneProjectResponseDto extends ResponseDto<ProjectDocument> {
  success: boolean;
}

export class UpdateProjectResponseDto extends ResponseDto<ProjectDocument> {
  success: boolean;
  updated: boolean;
}

export class RemoveProjectResponseDto extends ResponseDto<ProjectDocument> {
  success: boolean;
  removed: boolean;
}
