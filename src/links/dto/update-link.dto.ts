import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@InputType()
export class UpdateLinkDto {
  @Field({ nullable: true })
  @IsString({ message: 'Label must be a string' })
  readonly label?: string;

  @Field({ nullable: true })
  @IsString({ message: 'Icon must be a string' })
  readonly icon?: string;

  @Field({ nullable: true })
  @IsString({ message: 'Url must be a string' })
  @IsUrl({}, { message: 'Url is not valid' })
  readonly url?: string;
}
