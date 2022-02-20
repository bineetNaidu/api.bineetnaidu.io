import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Login Input DTO',
})
export class LoginInput {
  @Field({
    description: "User's email ",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field({
    description: "User's password ",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
