import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LearningProgress {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  themeId?: string;

  @Field(() => Int)
  wordsLearned: number;

  @Field(() => Int, { nullable: true })
  accuracyRate?: number;

  @Field(() => Date, { nullable: true })
  lastStudiedAt?: Date;
}
