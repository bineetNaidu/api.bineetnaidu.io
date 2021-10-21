import { PartialType } from '@nestjs/mapped-types';
import { CreateMaplifyDto } from './create-maplify.dto';

export class UpdateMaplifyDto extends PartialType(CreateMaplifyDto) {}
