import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
  @Prop({ required: true, unique: true })
  label: string;
  @Prop({ required: true, unique: true })
  icon: string;
  @Prop({ required: true })
  url: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
