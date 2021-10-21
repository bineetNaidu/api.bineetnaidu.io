import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  CreateProjectResponseDto,
  FindAllProjectsResponseDto,
  FindOneProjectResponseDto,
  UpdateProjectResponseDto,
  RemoveProjectResponseDto,
} from './dto/projects-response.dto';

@Controller('v1/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<CreateProjectResponseDto> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(
    @Query('featured') featured: boolean,
  ): Promise<FindAllProjectsResponseDto> {
    return this.projectsService.findAll(featured);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindOneProjectResponseDto> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateProjectResponseDto> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RemoveProjectResponseDto> {
    return this.projectsService.remove(id);
  }
}
