import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateThemeInput {
  @Field(() => String)
  userId: string;
}
