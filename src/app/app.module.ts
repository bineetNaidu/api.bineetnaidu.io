import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LinksModule } from 'src/links/links.module';
import { MaplifyModule } from 'src/maplify/maplify.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [DatabaseModule, LinksModule, MaplifyModule, ProjectsModule],
})
export class AppModule {}
