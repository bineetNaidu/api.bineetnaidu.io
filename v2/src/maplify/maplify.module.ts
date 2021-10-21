import { Module } from '@nestjs/common';
import { MaplifyService } from './maplify.service';
import { MaplifyController } from './maplify.controller';

@Module({
  controllers: [MaplifyController],
  providers: [MaplifyService],
})
export class MaplifyModule {}
