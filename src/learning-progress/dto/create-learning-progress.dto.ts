import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLearningProgressDto {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  themeId: string;
}
