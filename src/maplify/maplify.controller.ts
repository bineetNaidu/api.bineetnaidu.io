import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMaplifyDto } from './dto/create-maplify.dto';
import { MaplifyService } from './maplify.service';

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
