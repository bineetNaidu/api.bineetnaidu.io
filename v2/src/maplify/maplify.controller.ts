import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MaplifyService } from './maplify.service';
import { CreateMaplifyDto } from './dto/create-maplify.dto';
import { UpdateMaplifyDto } from './dto/update-maplify.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maplifyService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMaplifyDto: UpdateMaplifyDto) {
    return this.maplifyService.update(+id, updateMaplifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maplifyService.remove(+id);
  }
}
