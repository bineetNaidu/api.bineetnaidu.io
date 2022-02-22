import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProjectInput } from './createProject.input';

@InputType({ description: 'Update project input' })
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field({ description: 'The unique indentifier of the project' })
  _id!: string;
}
