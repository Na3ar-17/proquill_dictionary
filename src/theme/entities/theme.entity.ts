import { Field, ObjectType } from '@nestjs/graphql';
import { LearningProgress } from 'src/learning-progress/entities/learning-progress.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Theme {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: false })
  userId: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => LearningProgress)
  learningProgress: LearningProgress;
}
