import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LINKS_MODEL_NAME } from '../shared/constants';
import { CreateLinkDto } from './dto/create-link.dto';
import { FindAllLinksResponseDto } from './dto/link-response.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link, LinkDocument } from './model/links.model';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(LINKS_MODEL_NAME) private linkModel: Model<LinkDocument>,
  ) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    const link = new this.linkModel(createLinkDto);
    await link.save();
    return link;
  }

  async findAll(): Promise<FindAllLinksResponseDto> {
    const links = await this.linkModel.find({});

    return {
      data: links,
      success: true,
      length: links.length,
    };
  }

  async update(id: string, data: UpdateLinkDto): Promise<Link | null> {
    const link = await this.linkModel.findById(id);

    if (!link) {
      return null;
    }

    link.set(data);

    const updatedLink = await link.save();
    return updatedLink;
  }

  async remove(id: string): Promise<boolean> {
    const link = await this.linkModel.findById(id);

    if (!link) {
      return false;
    }

    const result = await this.linkModel.deleteOne({ _id: id });

    return result.acknowledged;
  }
}
