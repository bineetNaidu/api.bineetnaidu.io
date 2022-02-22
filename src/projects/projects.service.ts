import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROJECT_MODEL_NAME } from 'src/shared/constants';
import { MyCtx } from 'src/shared/types';
import { CreateProjectInput } from './dto/createProject.input';
import { Project, ProjectDocument } from './model/projects.model';
import { validate } from 'class-validator';
import { UpdateProjectInput } from './dto/updateProject.input';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(PROJECT_MODEL_NAME)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectModel
      .find()
      .populate('user')
      .populate('coverImage')
      .exec();
  }

  async findOne(_id: string): Promise<Project | null> {
    return await this.projectModel
      .findById(_id)
      .populate('user')
      .populate('coverImage')
      .exec();
  }

  async create(data: CreateProjectInput, { req }: MyCtx): Promise<Project> {
    if (!req.user) {
      throw new Error('You must be logged in to create a project');
    }

    const error = await validate(data);
    console.log(error);

    const project = await this.projectModel.create({
      ...data,
      user: req.user._id,
    });

    return project;
  }

  async update(
    _id: string,
    data: UpdateProjectInput,
    { req }: MyCtx,
  ): Promise<Project | null> {
    if (!req.user) {
      throw new Error('You must be logged in to update a project');
    }

    const project = await this.projectModel.findById(_id).exec();

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.user.toString() !== req.user._id.toString()) {
      throw new Error('You are not allowed to update this project');
    }

    const updatedProject = await this.projectModel
      .findByIdAndUpdate(_id, data, { new: true })
      .exec();

    return updatedProject;
  }

  async delete(_id: string, { req }: MyCtx): Promise<boolean> {
    if (!req.user) {
      throw new Error('You must be logged in to delete a project');
    }

    const project = await this.projectModel.findById(_id).exec();

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.user.toString() !== req.user._id.toString()) {
      throw new Error('You are not allowed to delete this project');
    }

    await this.projectModel.findByIdAndDelete(_id).exec();

    return true;
  }
}
