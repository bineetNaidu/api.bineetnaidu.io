import { Injectable } from '@nestjs/common';
import { CreateMaplifyDto } from './dto/create-maplify.dto';
import { UpdateMaplifyDto } from './dto/update-maplify.dto';

@Injectable()
export class MaplifyService {
  create(createMaplifyDto: CreateMaplifyDto) {
    return 'This action adds a new maplify';
  }

  findAll() {
    return `This action returns all maplify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maplify`;
  }

  update(id: number, updateMaplifyDto: UpdateMaplifyDto) {
    return `This action updates a #${id} maplify`;
  }

  remove(id: number) {
    return `This action removes a #${id} maplify`;
  }
}
