import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

export enum Status {
  Ongoing = 'ongoing',
  Planning = 'planning',
  Completed = 'completed',
}

@Schema({
  versionKey: false,
})
export class Project {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: false })
  url: string;
  @Prop({ required: false })
  github: string;
  @Prop({ default: false })
  featured: boolean;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, default: Status.Planning })
  status: Status;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
