import { Field, ID, InterfaceType, GraphQLISODateTime } from '@nestjs/graphql';

@InterfaceType()
export abstract class BaseDocument {
  @Field(() => ID)
  _id: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;
}
