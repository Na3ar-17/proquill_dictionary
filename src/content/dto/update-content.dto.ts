import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional, MinLength } from 'class-validator';
import { Content } from '../entities/content.entity';

@InputType()
export class UpdateContentDto extends PartialType(
  OmitType(Content, ['createdAt', 'updatedAt'] as const),
) {
  @Field(() => String)
  id: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  exampleSentences?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  imageUrl?: string;

  @Field(() => String)
  @MinLength(5, { message: 'The sentence is too short' })
  sentence?: string;

  @Field(() => String)
  themeId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  transcription?: string;

  @Field(() => String)
  @IsOptional()
  translation?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  lernedCounts?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  hasLearned?: boolean;
}
