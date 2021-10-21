import { Status } from '../model/projects.model';

export class CreateProjectDto {
  name: string;
  url?: string;
  github?: string;
  featured: boolean;
  description: string;
  status: Status;
}
