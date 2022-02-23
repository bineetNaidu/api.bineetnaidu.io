import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PROJECT_MODEL_NAME,
  JWT_SECRET,
  USER_MODEL_NAME,
} from 'src/shared/constants';
import { ProjectSchema } from './model/projects.model';
import { ProjectsResolver } from './projects.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/user/models/user.model';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([
      { name: PROJECT_MODEL_NAME, schema: ProjectSchema },
      { name: USER_MODEL_NAME, schema: UserSchema },
    ]),
  ],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}
