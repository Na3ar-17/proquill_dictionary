import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ValidateSelectedTranslation {
  @Field(() => String)
  translation: string;

  @Field(() => String)
  currentSentenceId: string;

  @Field(() => String)
  themeId: string;
}
