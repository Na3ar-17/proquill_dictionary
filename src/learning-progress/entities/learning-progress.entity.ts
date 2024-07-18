import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LearningProgress {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  themeId: string;

  @Field(() => Int)
  wordsLearned: number;

  @Field(() => Int, { nullable: true })
  accuracyRate?: number;

  @Field(() => Date, { nullable: true })
  lastStudiedAt?: Date;
}
