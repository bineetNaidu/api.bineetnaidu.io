import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsString({ message: 'Label must be a string' })
  @IsNotEmpty({ message: 'Label is required' })
  readonly label: string;

  @IsString({ message: 'Icon must be a string' })
  @IsNotEmpty({ message: 'Icon is required' })
  readonly icon: string;

  @IsString({ message: 'Url must be a string' })
  @IsNotEmpty({ message: 'Url is required' })
  @IsUrl({}, { message: 'Url is not valid' })
  readonly url: string;
}
