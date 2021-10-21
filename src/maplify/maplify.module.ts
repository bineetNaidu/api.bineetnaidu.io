import { MongooseModule } from '@nestjs/mongoose';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MaplifyService } from './maplify.service';
import { MaplifyController } from './maplify.controller';
import { MaplifySchema } from './model/maplify.model';
import { MAPLIFY_MODEL_NAME } from 'src/shared/constants';
import { IsAccessableMiddleware } from 'src/shared/middlewares/is-accessable.middleware';

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
