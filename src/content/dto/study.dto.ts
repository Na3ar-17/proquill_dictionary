import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ValidateSelectTrueTranslationDto {
  @Field(() => String)
  translation: string;

  @Field(() => String)
  currentSentenceId: string;
}
