import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_TEST_URI } from '../shared/constants';
import { DatabaseService } from './database.service';

@Module({
  imports: [MongooseModule.forRoot(MONGO_TEST_URI)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
