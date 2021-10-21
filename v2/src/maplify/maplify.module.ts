import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MaplifyService } from './maplify.service';
import { MaplifyController } from './maplify.controller';
import { MaplifySchema } from './model/maplify.model';
import { MAPLIFY_MODEL_NAME } from 'src/shared/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MAPLIFY_MODEL_NAME, schema: MaplifySchema },
    ]),
  ],
  controllers: [MaplifyController],
  providers: [MaplifyService],
})
export class MaplifyModule {}
