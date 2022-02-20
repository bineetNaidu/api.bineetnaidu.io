import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: 'Login Input DTO',
})
export class LoginInput {
  @Field({
    description: "User's email ",
  })
  email: string;
  @Field({
    description: "User's password ",
  })
  password: string;
}
