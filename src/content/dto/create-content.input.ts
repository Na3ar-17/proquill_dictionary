import { InputType, PickType } from '@nestjs/graphql';
import { Content } from '../entities/content.entity';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateContentInput extends PickType(Content, [
  'themeId',
  'sentence',
  'transcription',
  'translation',
  'exampleSentences',
  'imageUrl',
] as const) {
  @IsString()
  @MinLength(5, { message: 'The sentence is too short' })
  sentence: string;

  @IsString()
  translation: string;

  exampleSentences: string[];

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  themeId: string;

  @IsString()
  @IsOptional()
  transcription?: string;
}
