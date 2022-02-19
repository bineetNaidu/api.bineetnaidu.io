import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from './model/links.model';
import { LINKS_MODEL_NAME } from 'src/shared/constants';
import { IsAccessableMiddleware } from 'src/shared/middlewares/is-accessable.middleware';
import { LinksResolver } from './links.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LINKS_MODEL_NAME, schema: LinkSchema }]),
  ],
  controllers: [LinksController],
  providers: [LinksService, LinksResolver],
})
export class LinksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'links',
      method: RequestMethod.POST,
    });
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'links/:id',
      method: RequestMethod.PUT,
    });
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'links/:id',
      method: RequestMethod.DELETE,
    });
  }
}
