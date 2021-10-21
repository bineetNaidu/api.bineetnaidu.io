import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PROJECT_MODEL_NAME } from 'src/shared/constants';
import { ProjectSchema } from './model/projects.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROJECT_MODEL_NAME, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
