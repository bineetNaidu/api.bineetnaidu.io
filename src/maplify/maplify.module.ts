import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MAPLIFY_MODEL_NAME } from '../shared/constants';
import { IsAccessableMiddleware } from '../shared/middlewares/is-accessable.middleware';
import { MaplifyController } from './maplify.controller';
import { MaplifyService } from './maplify.service';
import { MaplifySchema } from './model/maplify.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MAPLIFY_MODEL_NAME, schema: MaplifySchema },
    ]),
  ],
  controllers: [MaplifyController],
  providers: [MaplifyService],
})
export class MaplifyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'v1/maplify',
      method: RequestMethod.POST,
    });
    consumer.apply(IsAccessableMiddleware).forRoutes({
      path: 'v1/maplify/:id',
      method: RequestMethod.DELETE,
    });
  }
}
