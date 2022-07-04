import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MAPLIFY_MODEL_NAME } from '../shared/constants';
import { CreateMaplifyDto } from './dto/create-maplify.dto';
import { MaplifyDocument } from './model/maplify.model';

@Injectable()
export class MaplifyService {
  constructor(
    @InjectModel(MAPLIFY_MODEL_NAME)
    private readonly maplifyModel: Model<MaplifyDocument>,
  ) {}

  async create(createMaplifyDto: CreateMaplifyDto) {
    const createdMaplify = new this.maplifyModel(createMaplifyDto);
    await createdMaplify.save();
    return {
      data: createdMaplify,
      success: true,
    };
  }

  async findAll() {
    const data = await this.maplifyModel.find();
    return {
      data,
      success: true,
      length: data.length,
    };
  }

  async remove(id: string) {
    await this.maplifyModel.findByIdAndDelete(id);
    return {
      success: true,
      message: 'Maplify deleted successfully',
    };
  }
}
