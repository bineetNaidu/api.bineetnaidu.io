import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Image } from 'src/images/models/image.model';
import { BaseDocument } from 'src/shared/BaseDocument.model';
import { IMAGE_MODEL_NAME, USER_MODEL_NAME } from 'src/shared/constants';
import { User } from '../../user/models/user.model';

export type ProjectDocument = Project & Document;

export enum ProjectStatus {
  ONGOING = 'ONGOING',
  PLANNING = 'PLANNING',
  COMPLETED = 'COMPLETED',
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
  description: 'The role of the user',
  valuesMap: {
    PLANNING: { description: 'The project is being planned' },
    ONGOING: { description: 'The project is ongoing' },
    COMPLETED: { description: 'The project is completed' },
  },
});

@ObjectType({ description: 'Project model', implements: [BaseDocument] })
@Schema({ versionKey: false, timestamps: true })
export class Project extends BaseDocument {
  @Field({ description: 'The name of the project' })
  @Prop({ required: true, unique: true })
  name!: string;

  @Field({ description: 'The live url of the project', nullable: true })
  @Prop({ default: '' })
  url?: string;

  @Field({ description: 'The github link of the project' })
  @Prop({ required: true })
  github!: string;

  @Field({ description: 'Is featured project' })
  @Prop({ default: false })
  featured: boolean;

  @Field({ description: 'The description of the project' })
  @Prop({ required: true })
  description!: string;

  @Field(() => ProjectStatus, { description: 'The status of the project' })
  @Prop({ required: true, default: ProjectStatus.ONGOING })
  status!: ProjectStatus;

  @Field(() => [String], {
    description: 'The technologies used in the project',
  })
  @Prop({ required: true, default: [] })
  technologies!: string[];

  @Field(() => Image, { description: 'The thumbnail of the project' })
  @Prop({ required: true, type: Types.ObjectId, ref: IMAGE_MODEL_NAME })
  thumbnail!: string;

  @Field(() => User, { description: 'The user who created the project' })
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: USER_MODEL_NAME,
  })
  user!: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
