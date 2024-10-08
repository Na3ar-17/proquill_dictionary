import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateContentDto {
  @Field(() => String)
  @IsString()
  @MinLength(5, { message: 'The sentence is too short' })
  sentence: string;

  @Field(() => String)
  @IsString()
  translation: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  exampleSentences?: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Field(() => String)
  @IsString()
  themeId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  transcription?: string;
}
