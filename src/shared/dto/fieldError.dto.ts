import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Field Error',
})
export class FieldError {
  @Field({
    description: 'Field name',
  })
  field: string;
  @Field({
    description: 'Error message',
  })
  message: string;
}
