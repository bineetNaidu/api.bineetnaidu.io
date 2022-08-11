import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { UserPrivilege } from '../../shared/types';

@InputType({
  description: 'Add User Privileges Input Dto',
})
export class AddUserPrivilegeInput {
  @Field(() => String, {
    description: "User's privileges",
  })
  @IsNotEmpty()
  privilege: UserPrivilege;
}
