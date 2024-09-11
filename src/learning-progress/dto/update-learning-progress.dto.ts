import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { CreateLearningProgressDto } from './create-learning-progress.dto';

@InputType()
export class UpdateLearningProgressDto extends OmitType(
  CreateLearningProgressDto,
  ['userId'],
) {
  @Field(() => Int, { nullable: true })
  wordsLearned?: number;

  @Field(() => Int, { nullable: true })
  accuracyRate?: number;

  @Field(() => Date, { nullable: true })
  lastStudiedAt?: Date;
}
