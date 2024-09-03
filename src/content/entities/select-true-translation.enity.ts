import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SelectTrueTranslation {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  itemsLeft: number;

  @Field(() => String)
  themeId: string;

  @Field(() => String)
  sentence: string;

  @Field(() => [Variations])
  variations: Variations[];
}

@ObjectType()
export class Variations {
  @Field(() => String)
  translation: string;
}
