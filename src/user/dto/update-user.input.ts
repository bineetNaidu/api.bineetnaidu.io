import { RegisterInput } from './register.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(RegisterInput) {}
