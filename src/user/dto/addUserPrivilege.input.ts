import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserPrivilege } from 'src/shared/types';

@InputType({
  description: 'Add User Privileges Input Dto',
})
export class AddUserPrivilegeInput {
  @Field(() => [UserPrivilege], {
    description: "User's email ",
  })
  @IsEnum(UserPrivilege)
  @IsNotEmpty()
  privileges: UserPrivilege[];
}
