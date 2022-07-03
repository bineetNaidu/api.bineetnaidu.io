import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDocument } from '../../shared/BaseDocument.model';

export type LinkDocument = Link & Document;

@ObjectType({
  implements: [BaseDocument],
})
@Schema({ timestamps: true })
export class Link extends BaseDocument {
  @Field()
  @Prop({ required: true, unique: true })
  label: string;
  @Field()
  @Prop({ required: true, unique: true })
  icon: string;
  @Field()
  @Prop({ required: true })
  url: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
