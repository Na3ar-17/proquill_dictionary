import { Field, InputType } from '@nestjs/graphql';
import { EnumStudyType } from '@prisma/client';

@InputType()
export class CreateQuizDto {
  @Field(() => String)
  themeId: string;

  @Field(() => EnumStudyType)
  type: EnumStudyType;
}
