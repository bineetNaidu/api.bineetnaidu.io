import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from '../config/configuration';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      configuration().environment === 'test'
        ? configuration().database.testUri
        : configuration().database.uri,
    ),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
