import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(6, { message: 'At least 6 charakters' })
  password: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  fullName?: string;
}
