import { Module } from '@nestjs/common';
import { LinksModule } from 'src/links/links.module';

@Module({
  imports: [LinksModule],
})
export class AppModule {}
