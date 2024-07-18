import { Content } from '../entities/content.entity';
import { InputType, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateContentInput extends PartialType(
  OmitType(Content, ['createdAt', 'updatedAt'] as const),
) {}
