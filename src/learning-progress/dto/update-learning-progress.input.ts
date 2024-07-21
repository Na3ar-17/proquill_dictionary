import { CreateLearningProgressInput } from './create-learning-progress.input';
import { InputType, Field, Int, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateLearningProgressInput extends OmitType(
  CreateLearningProgressInput,
  ['userId'],
) {
  @Field(() => Int, { nullable: true })
  wordsLearned?: number;

  @Field(() => Int, { nullable: true })
  accuracyRate?: number;

  @Field(() => Date, { nullable: true })
  lastStudiedAt?: Date;
}
