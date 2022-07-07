import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '../../shared/BaseDocument.model';
import { NormalUserPrivileges } from '../../shared/constants';
import { UserPrivilege } from '../../shared/types';

export type UserDocument = User & Document;

registerEnumType(UserPrivilege, {
  name: 'UserPrivilege',
  description: 'User privilege',
  valuesMap: {
    USERS_READ: { description: 'User has the ability to Read users' },
    USERS_WRITE: { description: 'User has the ability to Write users' },
    LINKS_DELETE: { description: 'User has the ability to Delete links' },
    LINKS_READ: { description: 'User has the ability to Read links' },
    LINKS_WRITE: { description: 'User has the ability to Write links' },
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
