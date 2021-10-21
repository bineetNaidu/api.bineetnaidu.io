import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaplifyDocument = Maplify & Document;

@Schema()
export class Maplify {
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  desc: string;
  @Prop({ required: true })
  lat: number;
  @Prop({ required: true })
  lng: number;
}

export const MaplifySchema = SchemaFactory.createForClass(Maplify);
