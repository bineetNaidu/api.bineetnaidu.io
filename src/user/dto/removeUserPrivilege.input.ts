import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserPrivilege } from 'src/shared/types';

@InputType({
  description: 'Remove User Privileges Input Dto',
})
export class RemoveUserPrivilegeInput {
  @Field({
    description: "User's email ",
  })
  @IsEnum(UserPrivilege)
  @IsNotEmpty()
  privilege: UserPrivilege;
}
