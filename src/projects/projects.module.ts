import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PROJECT_MODEL_NAME } from 'src/shared/constants';
import { ProjectSchema } from './model/projects.model';
import { IsAccessableMiddleware } from 'src/shared/middlewares/is-accessable.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PROJECT_MODEL_NAME, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'v1/projects',
      method: RequestMethod.POST,
    });
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'v1/projects/:id',
      method: RequestMethod.PUT,
    });
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'v1/projects/:id',
      method: RequestMethod.DELETE,
    });
  }
}
