import {
  Field,
  Int,
  ObjectType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import { EnumStudyType } from '@prisma/client';

registerEnumType(EnumStudyType, {
  name: 'EnumStudyType',
});

@ObjectType()
export class Quiz {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  themeId: string;

  @Field(() => Int)
  correctCount: number;

  @Field(() => Int)
  wrongCount: number;

  @Field(() => Int)
  correctAnswers: number;

  @Field(() => EnumStudyType)
  type: EnumStudyType;

  @Field(() => [String])
  repeatedSentences: string[];
}

@ObjectType()
export class QuizSession {
  @Field(() => Int)
  itemsLeft: number;

  @Field(() => String)
  themeId: string;

  @Field(() => String)
  sentence: string;

  @Field(() => [Variations])
  variations: Variations[];
}

@ObjectType()
export class Variations {
  @Field(() => String)
  translation: string;
}

@ObjectType()
export class Result extends PickType(Quiz, ['correctAnswers']) {}
