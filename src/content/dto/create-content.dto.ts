import { Field, InputType, PickType } from '@nestjs/graphql';
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

@InputType()
class CreateContentManyDataInput extends PickType(CreateContentDto, [
  'translation',
  'sentence',
  'transcription',
]) {}

@InputType()
export class CreateManyContentDto extends PickType(CreateContentDto, [
  'themeId',
]) {
  @Field(() => [CreateContentManyDataInput])
  data: CreateContentManyDataInput[];
}
