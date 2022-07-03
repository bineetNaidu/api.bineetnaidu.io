import { Field, ID, InterfaceType, GraphQLISODateTime } from '@nestjs/graphql';

@InterfaceType()
export abstract class BaseDocument {
  @Field(() => ID, { description: 'The unique identifier of the document' })
  _id: string;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'The date when the document was created',
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'The date when the document was updated',
  })
  updatedAt: Date;
}
