import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseDocument } from '../../shared/BaseDocument.model';
import { UserPrivilege } from 'src/shared/types';
import { NormalUserPrivileges } from '../../shared/constants';

export type UserDocument = User & Document;

registerEnumType(UserPrivilege, {
  name: 'UserPrivilege',
  description: 'User privilege',
  valuesMap: {
    IMAGES_DELETE: { description: 'User has the ability to Delete images' },
    IMAGES_READ: { description: 'User has the ability to Read images' },
    IMAGES_WRITE: { description: 'User has the ability to Write images' },
    USERS_READ: { description: 'User has the ability to Read users' },
    USERS_WRITE: { description: 'User has the ability to Write users' },
    LINKS_DELETE: { description: 'User has the ability to Delete links' },
    LINKS_READ: { description: 'User has the ability to Read links' },
    LINKS_WRITE: { description: 'User has the ability to Write links' },
    PROJECTS_DELETE: { description: 'User has the ability to Delete projects' },
    PROJECTS_READ: { description: 'User has the ability to Read projects' },
    PROJECTS_WRITE: { description: 'User has the ability to Write projects' },
  },
});

@ObjectType({
  description: 'User model',
  implements: [BaseDocument],
})
@Schema({ versionKey: false, timestamps: true })
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

  @Field(() => [String], { description: 'The Privileges of the user' })
  @Prop({ default: NormalUserPrivileges, required: true })
  privileges: UserPrivilege[];

  @Field({ description: 'The avatar of the user' })
  @Prop({ required: true })
  avatar!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
