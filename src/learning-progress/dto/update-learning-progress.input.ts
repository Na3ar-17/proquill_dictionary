import { CreateLearningProgressInput } from './create-learning-progress.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLearningProgressInput extends PartialType(CreateLearningProgressInput) {
  @Field(() => Int)
  id: number;
}
