import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LINKS_MODEL_NAME } from 'src/shared/constants';
import {
  CreateLinkResponseDto,
  DeleteLinkResponseDto,
  FindAllLinksResponseDto,
  UpdateLinkResponseDto,
} from './dto/link-response.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinkDocument } from './model/links.model';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(LINKS_MODEL_NAME) private linkModel: Model<LinkDocument>,
  ) {}

  async create(createLinkDto: CreateLinkDto): Promise<CreateLinkResponseDto> {
    const link = new this.linkModel(createLinkDto);
    await link.save();

    return {
      data: link,
      created: true,
    };
  }

  async findAll(): Promise<FindAllLinksResponseDto> {
    const links = await this.linkModel.find({});

    return {
      data: links,
      success: true,
      length: links.length,
    };
  }

  async update(
    id: string,
    data: UpdateLinkDto,
  ): Promise<UpdateLinkResponseDto> {
    const link = await this.linkModel.findById(id);

    if (!link) {
      throw new NotFoundException('Link does not exist!');
    }

    link.set(data);

    const updatedLink = await link.save();
    return {
      data: updatedLink,
      updated: true,
    };
  }

  async remove(id: string): Promise<DeleteLinkResponseDto> {
    const link = await this.linkModel.findById(id);

    if (!link) {
      throw new NotFoundException('Link does not exist!');
    }

    await link.remove();

    return {
      deleted: true,
      deleted_link_id: link.id,
    };
  }
}
