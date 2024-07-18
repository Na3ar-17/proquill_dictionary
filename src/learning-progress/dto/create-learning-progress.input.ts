import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLearningProgressInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  themeId: string;
}
