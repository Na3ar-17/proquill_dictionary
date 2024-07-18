import { IsOptional, MinLength } from 'class-validator';
import { Content } from '../entities/content.entity';
import { InputType, PartialType, OmitType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateContentInput extends PartialType(
  OmitType(Content, ['createdAt', 'updatedAt'] as const),
) {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  exampleSentences?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  imageUrl?: string;

  @Field(() => String)
  @MinLength(5, { message: 'The sentence is too short' })
  sentence?: string;

  @Field(() => String)
  themeId: string;

  @Field(() => String)
  transcription?: string;

  @Field(() => String)
  translation?: string;
}
