import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateLinkDto {
  @Field({ nullable: true })
  readonly label?: string;

  @Field({ nullable: true })
  readonly icon?: string;

  @Field({ nullable: true })
  readonly url?: string;
}
