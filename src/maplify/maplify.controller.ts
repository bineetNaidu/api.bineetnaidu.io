import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MaplifyService } from './maplify.service';
import { CreateMaplifyDto } from './dto/create-maplify.dto';

@Controller('v1/maplify')
export class MaplifyController {
  constructor(private readonly maplifyService: MaplifyService) {}

  @Post()
  create(@Body() createMaplifyDto: CreateMaplifyDto) {
    return this.maplifyService.create(createMaplifyDto);
  }

  @Get()
  findAll() {
    return this.maplifyService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maplifyService.remove(id);
  }
}
