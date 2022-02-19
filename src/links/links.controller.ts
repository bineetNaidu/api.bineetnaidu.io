import { Controller, Get, All } from '@nestjs/common';
import { LinksService } from './links.service';
import { FindAllLinksResponseDto } from './dto/link-response.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  async findAll(): Promise<FindAllLinksResponseDto> {
    return this.linksService.findAll();
  }

  @All('/*')
  async serviceRemove() {
    return {
      notice: 'This Service routes was removed. use the graphql api instead',
    };
  }
}
