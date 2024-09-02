import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokensResponse {
  @Field(() => String)
  accessToken: string;
}
