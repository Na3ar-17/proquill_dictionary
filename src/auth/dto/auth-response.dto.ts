import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: Omit<User, 'password'>;

  @Field(() => String)
  accessToken: string;
}
