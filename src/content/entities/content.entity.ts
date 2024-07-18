import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Content {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  themeId: string;

  @Field(() => String)
  sentence: string;

  @Field(() => String)
  translation: string;

  @Field(() => String, { nullable: true })
  transcription?: string;

  @Field(() => [String])
  exampleSentences: string[];

  @Field(() => String, { nullable: true })
  imageUrl?: string;
}
