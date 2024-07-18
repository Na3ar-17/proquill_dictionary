import { ObjectType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

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
  @IsOptional()
  transcription?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  exampleSentences?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  imageUrl?: string;
}
