import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Content {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
