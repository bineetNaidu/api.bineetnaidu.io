import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDocument } from '../../shared/BaseDocument.model';
import { User } from 'src/user/models/user.model';
import { USER_MODEL_NAME } from 'src/shared/constants';

export type ImageDocument = Image & Document;

@ObjectType({
  implements: [BaseDocument],
})
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Image extends BaseDocument {
  @Field({ description: 'The cloudinary filename' })
  @Prop({ required: true })
  filename!: string;
  @Field({ description: 'The image name' })
  @Prop({ required: true })
  name!: string;
  @Field({ description: 'The image url' })
  @Prop({ required: true })
  url!: string;
  @Field(() => User, { description: 'The User who added the image' })
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: USER_MODEL_NAME,
  })
  uploadedBy!: User;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
