import { InputType, PickType } from '@nestjs/graphql';
import { Content } from '../entities/content.entity';

@InputType()
export class CreateContentInput extends PickType(Content, [
  'themeId',
  'sentence',
  'transcription',
  'translation',
  'exampleSentences',
  'imageUrl',
] as const) {}
