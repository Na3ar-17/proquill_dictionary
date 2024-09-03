import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ValidateSelectedTranslation {
  @Field(() => String)
  translation: string;

  @Field(() => String)
  currentSentenceId: string;

  @Field(() => String)
  themeId: string;
}
