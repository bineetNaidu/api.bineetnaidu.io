import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from 'src/shared/dto/fieldError.dto';
import { User } from '../models/user.model';

@ObjectType({
  description: 'Auth Response DTO',
})
export class AuthResponseDto {
  @Field({
    description: 'User Access token',
    nullable: true,
  })
  accessToken?: string;
  @Field(() => User, {
    description: 'Auth User',
    nullable: true,
  })
  user?: User;

  @Field(() => [FieldError], {
    nullable: true,
    description: 'Errors from Response',
  })
  errors?: FieldError[];
}
