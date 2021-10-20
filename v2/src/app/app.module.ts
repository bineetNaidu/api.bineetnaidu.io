import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LinksModule } from 'src/links/links.module';

@Module({
  imports: [DatabaseModule, LinksModule],
})
export class AppModule {}
