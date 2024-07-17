import { ObjectType, Field } from '@nestjs/graphql';
import { Theme } from 'src/theme/entities/theme.entity';

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

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  profilePictureUrl?: string;

  @Field(() => [Theme], { nullable: true })
  themes?: Theme[];
}
