import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => String, { nullable: true })
  profilePictureUrl?: string;
}
