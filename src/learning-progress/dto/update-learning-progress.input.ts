import { CreateLearningProgressInput } from './create-learning-progress.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateLearningProgressInput extends CreateLearningProgressInput {
  @Field(() => String)
  id: string;

  @Field(() => Int, { nullable: true })
  wordsLearned?: number;

  @Field(() => Int, { nullable: true })
  accuracyRate?: number;

  @Field(() => Date, { nullable: true })
  lastStudiedAt?: Date;
}
