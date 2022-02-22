import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PROJECT_MODEL_NAME } from 'src/shared/constants';
import { ProjectSchema } from './model/projects.model';
import { ProjectsResolver } from './projects.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROJECT_MODEL_NAME, schema: ProjectSchema },
    ]),
  ],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}
