import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateLinkDto {
  @Field()
  @IsString({ message: 'Label must be a string' })
  @IsNotEmpty({ message: 'Label is required' })
  readonly label: string;

  @Field()
  @IsString({ message: 'Icon must be a string' })
  @IsNotEmpty({ message: 'Icon is required' })
  readonly icon: string;

  @Field()
  @IsString({ message: 'Url must be a string' })
  @IsNotEmpty({ message: 'Url is required' })
  @IsUrl({}, { message: 'Url is not valid' })
  readonly url: string;
}
