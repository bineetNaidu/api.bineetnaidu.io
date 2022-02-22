import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { MyCtx } from 'src/shared/types';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { Project } from './model/projects.model';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private projectService: ProjectsService) {}

  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Query(() => Project, { nullable: true })
  async project(@Args('_id') _id: string): Promise<Project | null> {
    return await this.projectService.findOne(_id);
  }

  @Mutation(() => Project)
  async createProject(
    @Args('data') data: CreateProjectInput,
    @Context() ctx: MyCtx,
  ): Promise<Project> {
    return await this.projectService.create(data, ctx);
  }

  @Mutation(() => Project, { nullable: true })
  async updateProject(
    @Args('_id') _id: string,
    @Args('data') data: UpdateProjectInput,
    @Context() ctx: MyCtx,
  ): Promise<Project | null> {
    return await this.projectService.update(_id, data, ctx);
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Args('_id') _id: string,
    @Context() ctx: MyCtx,
  ): Promise<boolean> {
    return await this.projectService.delete(_id, ctx);
  }
}
