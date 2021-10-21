import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import {
  CreateLinkResponseDto,
  DeleteLinkResponseDto,
  FindAllLinksResponseDto,
  UpdateLinkResponseDto,
} from './dto/link-response.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  async create(
    @Body() createLinkDto: CreateLinkDto,
  ): Promise<CreateLinkResponseDto> {
    return this.linksService.create(createLinkDto);
  }

  @Get()
  async findAll(): Promise<FindAllLinksResponseDto> {
    return this.linksService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<UpdateLinkResponseDto> {
    return this.linksService.update(id, updateLinkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteLinkResponseDto> {
    return this.linksService.remove(id);
  }
}
