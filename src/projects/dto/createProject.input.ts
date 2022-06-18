import { InputType, Field } from '@nestjs/graphql';
import { ProjectStatus } from '../model/projects.model';

@InputType({ description: 'Create project input' })
export class CreateProjectInput {
  @Field({ description: 'The name of the project' })
  name!: string;

  @Field({ description: 'The live url of the project', nullable: true })
  url?: string;

  @Field({ description: 'The github link of the project' })
  github!: string;

  @Field({ description: 'Is featured project' })
  featured: boolean;

  @Field({ description: 'The description of the project' })
  description!: string;

  @Field(() => ProjectStatus, { description: 'The status of the project' })
  status!: ProjectStatus;

  @Field(() => [String], {
    description: 'The technologies used in the project',
  })
  technologies!: string[];

  @Field(() => String, {
    description: 'The thumbnail of the project',
  })
  thumbnail!: string;
}
