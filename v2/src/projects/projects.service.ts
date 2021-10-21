import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { PROJECT_MODEL_NAME } from 'src/shared/constants';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectDocument } from './model/projects.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(PROJECT_MODEL_NAME)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const createdProject = new this.projectModel(createProjectDto);
    await createdProject.save();
    return {
      created: true,
      success: true,
      data: createdProject,
    };
  }

  async findAll(featured: boolean) {
    let projects;

    if (featured) {
      projects = await this.projectModel.find({
        featured: true,
      });
    } else {
      projects = await this.projectModel.find({});
    }

    return {
      data: projects,
      success: true,
      length: projects.length,
    };
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) throw new NotFoundError('Project Not Found');

    return {
      data: project,
      success: true,
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findById(id);
    if (!project) throw new NotFoundError('Project Not Found');

    project.set(updateProjectDto);
    await project.save();

    return {
      data: project,
      success: true,
      updated: true,
    };
  }

  async remove(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) throw new NotFoundError('Project Not Found');
    await project.remove();
    return {
      data: project,
      success: true,
      removed: true,
    };
  }
}
