import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LearningProgress {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
