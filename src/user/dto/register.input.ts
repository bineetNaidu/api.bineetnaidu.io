import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Register Input DTO',
})
export class RegisterInput {
  @Field({
    description: "User's first name",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field({
    description: "User's last name",
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field({
    description: "User's email",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field({ nullable: true, description: "User's avatar" })
  avatar?: string;
}
