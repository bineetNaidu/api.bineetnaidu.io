import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from './model/links.model';
import { LINKS_MODEL_NAME } from 'src/shared/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LINKS_MODEL_NAME, schema: LinkSchema }]),
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
