import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseDocument } from '../../shared/BaseDocument.model';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The role of the user',
  valuesMap: {
    ADMIN: {
      description: 'The user is an admin',
    },
    USER: {
      description: 'The user is a regular user',
    },
  },
});

@ObjectType({
  implements: [BaseDocument],
})
@Schema({ timestamps: true })
export class User extends BaseDocument {
  @Field({ description: 'The email of the user and its unique' })
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Field({ description: 'The first name of the user' })
  @Prop({ required: true })
  firstName!: string;

  @Field({ description: 'The last name of the user' })
  @Prop({ required: true })
  lastName!: string;

  @Field(() => UserRole, { description: 'The role of the user' })
  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field({ description: 'The avatar of the user' })
  @Prop({ required: true })
  avatar!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
